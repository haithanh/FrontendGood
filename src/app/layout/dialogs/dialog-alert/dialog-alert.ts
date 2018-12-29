import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-alert',
    templateUrl: './dialog-alert.html',
})

export class DialogAlertComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
