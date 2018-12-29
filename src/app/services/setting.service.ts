import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {JSONObject} from '../models/JSONObject';
import {BaseService} from './base.service';
import * as _ from 'lodash';
import {ShareService} from './share.service';

@Injectable()
export class SettingService extends BaseService {

    public defaultSetting: any = [];

    constructor(private http: HttpClient,
                private _share: ShareService) {
        super();
    }

    getUrl(key: string): string {
        switch (key) {
            case 'card-payment-gate':
                return '/setting/card-payment-gate';
            case 'card-promotion':
                return '/setting/card-promotion';
            case 'first-card':
                return '/setting/first-card';
            case 'rewards':
                return '/setting/rewards';
            case 'rewards-limit':
                return '/setting/rewards-limit';
            case 'agency':
                return '/setting/agency';
            default:
                return '/setting/default-setting';
        }
    }

    getDefaultSetting(): void {
        this._share.load(true);
        this.getSetting().subscribe(
            data => {
                this.defaultSetting = data;
                this._share.load(false);
            }
        )
    }

    getSetting(key: string = ''): Observable<any> {
        const url = this.getUrl(key);
        return this.http.get<JSONObject>(url)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    setSetting(key: string = '', params: any = []): void {
        const url = this.getUrl(key);
        this._share.load(true);
        this.http.post<JSONObject>(url, JSON.stringify(params)).map((response) => {
            return response;
        }).subscribe(
            response => {
                this._share.load(false);
                this._share.message(response.message);
            },
            error => {
                this._share.load(false);
                this._share.message(error.message);
            }
        );
    }

    getCardPaymentGateSetting(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/card-payment-gate?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    setCardPaymentGateSetting(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/card-payment-gate', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    getCardPromotionSetting(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/card-promotion?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    setCardPromotionSetting(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/card-promotion', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    getFirstCardSetting(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/first-card?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    setFirstCardSetting(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/first-card', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    getRewardsSetting(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/rewards?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    getRewardsSettingLimit(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/rewards-limit?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    getAgencySetting(page: number, param: any = []): Observable<any> {
        const string = this.queryStringParams(param);
        return this.http.get<JSONObject>(`/setting/agency?page=${page}&${string}`)
            .map((response) => {
                const {code: code, message: message, data: data} = response;
                return data;
            });
    }

    setRewardSetting(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/rewards', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    setRewardSettingLimit(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/rewards-limit', JSON.stringify(data)).map((response) => {
            return response;
        });
    }

    setAgencySetting(data: any): Observable<any> {
        return this.http.post<JSONObject>('/setting/agency', JSON.stringify(data)).map((response) => {
            return response;
        });
    }
}
