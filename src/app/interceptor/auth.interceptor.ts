import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {HttpCacheService} from '../services/http-cache.service';
import {Token} from '../models/token';
import {environment} from '../../environments/environment';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import {LocalStoreManagerService} from '../services/local-store-manager.service';
import {Md5} from 'ts-md5';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router,
                private cache: HttpCacheService,
                private localStoreManagerService: LocalStoreManagerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // declare header
        const apiURLRoot = environment.apiUrl;
        const header: any = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        };
        const urlAPI = req.clone({url: apiURLRoot + req.url});
        if (urlAPI.url.indexOf('login') !== -1 && urlAPI.method === 'POST') {
            // is login
            header.Authorization = 'Basic ' + Md5.hashStr(environment.username + environment.password);
        } else {
            let token: Token;
            token = this.localStoreManagerService.getData('accessToken');
            if (token) {
                header.Authorization = 'bearer ' + token.access_token;
            }
        }
        if (urlAPI.url.indexOf('tools/upload') !== -1) {
            // upload image
            delete header['Content-Type'];
            header['Accept'] = 'application/json';
        }
        const authReq = req.clone({setHeaders: header, url: apiURLRoot + req.url});

        return <any>next.handle(authReq).catch((res: any) => {
            if (res.status === 401) {
                return this.router.navigate(['/auth/login']);
            }
            if (res.status === 403) {
                return this.router.navigate(['']);
            }

            // parse message errors
            let messages = '';
            let field = '';
            if (!_.isEmpty(res.error.message)) {
                messages += res.error.message + '<br>';
            }
            if (!_.isEmpty(res.error.data) && !_.isEmpty(res.error.data.errors)) {
                for (field in res.error.data.errors) {
                    if (res.error.data.errors.hasOwnProperty(field)) {
                        messages += res.error.data.errors[field].join('<br>') + '<br>';
                    }

                }
            }
            return throwError({message: messages});

        });
    }


}
