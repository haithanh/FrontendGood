import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-confirm',
    templateUrl: './dialog-confirm.html',
})

export class DialogConfirmComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }
}
