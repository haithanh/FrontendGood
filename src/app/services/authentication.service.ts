import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {JSONObject} from '../models/JSONObject';
import {Token} from '../models/token';
import {LocalStoreManagerService} from './local-store-manager.service';
import {ROLE_ADMIN, ROLE_SUPER_ADMIN, ROLES} from '../fuse-config/global-const';
import * as _ from 'lodash';
import {BaseService} from './base.service';
import {User} from '../models/user';

@Injectable()
export class AuthenticationService extends BaseService {
    tokenObservable: Observable<string>;
    currentUserObservable: Observable<string> = null;

    constructor(private http: HttpClient,
                private router: Router,
                private localStoreManagerService: LocalStoreManagerService) {
        super();
    }

    login(params: any): Observable<any> {
        return this.http.post<JSONObject>('/login', JSON.stringify(params))
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                this.setSessionAccessToken(data.token);
                this.setSessionUserLogin(data.user);
                return data;
            });

    }

    account(params: any): Observable<any> {
        return this.http.post<JSONObject>('/account', JSON.stringify(params));
    }

    changePassword(params: any): Observable<any> {
        return this.http.post('/change-password', JSON.stringify(params));
    }

    setSessionAccessToken(token: any): void {
        const data = new Token();
        data.access_token = token;
        this.localStoreManagerService.saveSyncedSessionData(data, 'accessToken');
    }

    setSessionUserLogin(user: User): void {
        this.localStoreManagerService.saveSyncedSessionData(user, 'adminUser');
    }

    deleteSession(): void {
        this.localStoreManagerService.deleteData('accessToken');
        this.localStoreManagerService.deleteData('adminUser');
    }

    checkRole(roleCheck: string): boolean {

        if (!roleCheck) {
            return true;
        }

        const adminUser = this.localStoreManagerService.getData('adminUser');
        if (adminUser) {
            const roleSuperAdmin = adminUser.roles.find(role => role.name === ROLE_SUPER_ADMIN);
            // is role supper admin
            if (roleSuperAdmin) {
                console.log(1);
                return true;
            }
            if (roleCheck !== ROLE_SUPER_ADMIN) {
                // is role admin
                const roleAdmin = adminUser.roles.find(role => role.name === ROLE_ADMIN);
                if (roleAdmin) {
                    console.log(2);
                    return true;
                }

                const checkRole = adminUser.roles.find(role => role.name === roleCheck);
                if (checkRole) {
                    console.log(3);
                    return true;
                }
            }
        }
        return false;
    }

    getUser(): any {
        const admin = this.localStoreManagerService.getData('adminUser');
        return admin;
    }
}
