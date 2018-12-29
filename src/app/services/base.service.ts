import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {LocalStoreManagerService} from './local-store-manager.service';
import * as _ from 'lodash';
import {LIMIT_PAGINATION} from '../fuse-config/global-const';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BaseService {
    private subject = new Subject<any>();

    queryStringParams(param: any, addPagi: boolean = true): any {
        let defaultSearch = {};
        if (addPagi) {
            defaultSearch = {
                limit: LIMIT_PAGINATION,
                order_by: 'created_at',
                order_type: 'DESC'
            };
        }
        const data = _.merge(defaultSearch, param);
        const ret = [];
        for (const d in data) {
            if (data.hasOwnProperty(d)) {
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }
        }
        return ret.join('&');
    }

    getParamsFilter(filterObject: any, param: string, value: any): Object {
        let temp = {};
        temp = JSON.parse(JSON.stringify(filterObject));
        if (!_.isEmpty(value) || (_.isNumber(value))) {
            temp[param] = value;
        } else {
            delete temp[param];
        }
        return temp;
    }
}
