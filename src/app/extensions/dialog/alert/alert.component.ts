import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef }    from '@angular/cdk/dialog';

export interface AlertDialogConfig {
    type?: string,
    duration?: number,
    message?: string
}

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

    public alertTypeClass = {
        'alert-dialog-success': false,
        'alert-dialog-warning': false,
        'alert-dialog-error': false
    };

    constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: AlertDialogConfig) {
        let key = ('alert-dialog-' + data.type) as ('alert-dialog-success' | 'alert-dialog-warning' | 'alert-dialog-error');
        this.alertTypeClass[key] = true;
    }

    ngOnInit(): void {
    }

}
