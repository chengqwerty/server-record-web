import { Injectable }                        from '@angular/core';
import { AlertComponent, AlertDialogConfig } from '@/app/extensions/dialog/alert/alert.component';
import { Dialog }                            from '@angular/cdk/dialog';
import { GlobalPositionStrategy }            from '@angular/cdk/overlay';
import { config }                            from 'rxjs';

@Injectable()
export class DialogService {

    constructor(public dialog: Dialog) {
    }

    public alert(type: 'success' | 'error' | 'warning', message: string, config?: AlertDialogConfig): void {
        const positionStrategy = new GlobalPositionStrategy();
        positionStrategy.right('24px');
        positionStrategy.top('32px');
        let dialogRef = this.dialog.open(AlertComponent, {
            // width: '250px',
            data: Object.assign({}, config, {type: type, message: message}),
            backdropClass: 'none',
            positionStrategy: positionStrategy
        });
        const duration = config?.duration || 2000;
        setTimeout(() => {
            dialogRef.close(true);
        }, duration);
    }

    public success(message: string, config?: AlertDialogConfig) {
        this.alert('success', message, config);
    }

    public warning(message: string, config?: AlertDialogConfig) {
        this.alert('warning', message, config);
    }

    public error(message: string, config?: AlertDialogConfig) {
        this.alert('warning', message, config);
    }

    public confirm() {

    }

}
