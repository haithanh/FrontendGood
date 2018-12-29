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

@Injectable()
export class RoleService extends BaseService {

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService,
              private localStoreManagerService: LocalStoreManagerService) {
    super();
  }

  getAllData(): Observable<any> {
    return this.http.get<JSONObject>('/roles')
      .map((response) => {
        const {code: code, message: message, data: data} = response;
        return data;
      });
  }

  update(data: any = []): Observable<any> {
    return this.http.put<JSONObject>(`/roles`, JSON.stringify({roles: data}))
      .map((response) => {
        const {code: code, message: message, data: data} = response;
        return message;
      });
  }
}
