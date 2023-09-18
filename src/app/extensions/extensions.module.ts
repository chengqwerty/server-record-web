import { NgModule }         from '@angular/core';
import { SharedModule }     from '../shared/shared.module';
import { AlertComponent }   from './dialog/alert/alert.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { DialogModule }     from '@angular/cdk/dialog';
import { DialogService }    from '@/app/extensions/dialog/dialog.service';


@NgModule({
    declarations: [
        AlertComponent,
        ConfirmComponent,
    ],
    exports: [],
    providers: [DialogService],
    imports: [
        DialogModule,
        SharedModule
    ]
})
export class ExtensionsModule {
}
