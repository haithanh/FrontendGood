import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';
import {TranslateService} from '@ngx-translate/core';

import * as _ from 'lodash';
import {HttpClient} from '@angular/common/http';
import {FuseProgressBarService} from '../../@fuse/components/progress-bar/progress-bar.service';
import {MatDialog, MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material';
import {DialogAlertComponent} from '../layout/dialogs/dialog-alert/dialog-alert';
import * as moment from 'moment';
import {FuseSplashScreenService} from '../../@fuse/services/splash-screen.service';

@Injectable()
export class ShareService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(private _fuseProgress: FuseProgressBarService,
                private _snackBar: MatSnackBar,
                private _dialog: MatDialog,
                private _fuseSplashScreen: FuseSplashScreenService) {
    }

    load(show: boolean): void {
        if (show) {
            this._fuseProgress.show();
        } else {
            this._fuseProgress.hide();
        }
    }

    screen(show: boolean): void {
        if (show) {
            this._fuseSplashScreen.show();
        } else {
            this._fuseSplashScreen.hide();
        }
    }

    message(content: string): void {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'end';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';

        this._snackBar.open(content, 'End', {
            duration: 5000,
            horizontalPosition: horizontalPosition,
            verticalPosition: verticalPosition,
        });
    }

    messageBlock(content: string, title: string): void {
        this._dialog.open(DialogAlertComponent, {
            data: {content: content, title: title}
        });
    }

    setDate(set: boolean, aData): any {
        const aKeys = Object.keys(aData);
        const aKeyDate = ['start', 'end'];
        if (set) {
            for (const sKey of aKeys) {
                if (aData.hasOwnProperty(sKey)) {
                    for (const sKeyDate of aKeyDate) {
                        if (aData[sKey].hasOwnProperty(sKeyDate)) {
                            aData[sKey][sKeyDate] = new Date(aData[sKey][sKeyDate]);
                        }
                    }
                }
            }
        } else {
            for (const sKey of aKeys) {
                if (aData.hasOwnProperty(sKey)) {
                    for (const sKeyDate of aKeyDate) {
                        if (aData[sKey].hasOwnProperty(sKeyDate)) {
                            aData[sKey][sKeyDate] = moment(aData[sKey][sKeyDate]).format('YYYY-MM-DD HH:mm:ss');
                            if (aData[sKey][sKeyDate] === 'Invalid date') {
                                aData[sKey][sKeyDate] = '';
                            }
                        }
                    }
                }

            }
        }
        return aData;
    }

    downloadFile(sUrl: string): void {
        const link = document.createElement('a');
        link.href = sUrl;
        link.click();
    }

}
