import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {JSONObject} from '../models/JSONObject';
import {LocalStoreManagerService} from './local-store-manager.service';
import {BaseService} from './base.service';
import * as _ from 'lodash';
import {User} from '../models/user';

@Injectable()
export class UserService extends BaseService {
    adminUser: User;

    constructor(private http: HttpClient,
                private authenticationService: AuthenticationService,
                private localStoreManagerService: LocalStoreManagerService) {
        super();
        this.adminUser = this.localStoreManagerService.getData('adminUser');
    }

    getAllData(param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>('/administrators?' + string)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    getDataByID(id: number): Observable<User> {
        return this.http.get<JSONObject>(`/administrators/${id}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    create(data: User): Observable<any> {
        return this.http.post<JSONObject>('/administrators', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    update(data: User, id: number): Observable<any> {
        return this.http.put<JSONObject>(`/administrators/${id}`, JSON.stringify(data))
            .map((response) => {
                const {code: number, message: message, data: data} = response;
                if (this.adminUser.id === id) {
                    this.authenticationService.setSessionUserLogin(_.merge(this.adminUser, data));
                }
                return message;
            });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<JSONObject>(`/administrators/${id}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return message;
            });
    }

    changePassword(data: any): Observable<any> {
        return this.http.post<JSONObject>('/administrators/change-password', JSON.stringify(data))
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return message;
            });
    }

    uploadImage(data: any, ID: number): Observable<any> {
        return this.http.post<JSONObject>('/administrators/' + ID + '/images', data)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    deleteImage(imageID: number, ID: number): Observable<any> {
        return this.http.delete<JSONObject>(`/administrators/${ID}/images/` + imageID)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    getActionLogByID(page: number = 1, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/logs/action-logs?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }
}
