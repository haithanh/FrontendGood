import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';

import * as _ from 'lodash';
import {FormBuilder} from '@angular/forms';
import {ShareService} from '../../../services/share.service';
import {merge} from 'rxjs';
import * as moment from 'moment';
import {AuthenticationService} from '../../../services/authentication.service';
import {User} from '../../../models/user';
import {DialogConfirmComponent} from '../../../layout/dialogs/dialog-confirm/dialog-confirm';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements AfterViewInit {

    bDisableEdit = false;
    @Input() aAccount: User;
    @Input() aChangePassword = {};

    constructor(private _formBuilder: FormBuilder,
                public _auth: AuthenticationService,
                private _share: ShareService,
                private _translate: TranslateService) {
        this.aAccount = _auth.getUser();
        if (!this.aAccount.information) {
            this.aAccount.information = {};
        }
    }


    onTabChanges(event: any): void {
        if (event.index === 1) {
            // Tab list
        } else {
            // Tab Setting
        }
    }

    onSubmitAccount(): void {
        this._share.load(true);
        this.bDisableEdit = true;
        this._auth.account(this.aAccount.information).subscribe(
            response => {
                this._share.load(false);
                this.bDisableEdit = false;
                this._share.message(response.message);
                if (response.code === 200) {
                    this._auth.setSessionUserLogin(this.aAccount);
                }
            },
            error => {
                this._share.load(false);
                this.bDisableEdit = false;
                this._share.message(error.message);
            }
        );
    }

    onSubmitPassword(): void {
        if (this.aChangePassword['new_pass'] !== this.aChangePassword['re_pass']) {
            const content = this._translate.get('MESSAGE.RE_NEW_PASS');
            content.subscribe(res => {
                this._share.message(res);
            });
        } else {
            this._share.load(true);
            this.bDisableEdit = true;
            this._auth.changePassword(this.aChangePassword).subscribe(
                response => {
                    this._share.load(false);
                    this.bDisableEdit = false;
                    this._share.message(response.message);
                    if (response.code === 200) {
                        this._auth.setSessionUserLogin(this.aAccount);
                    }
                },
                error => {
                    this._share.load(false);
                    this.bDisableEdit = false;
                    console.log(error.message);
                    this._share.messageBlock(error.message, ' ');
                }
            );
        }
    }


    ngAfterViewInit(): void {
    }


}
