import { NgModule }             from '@angular/core';
import { ReplyDialogComponent } from '@/app/extensions/reply-dialog/reply-dialog.component';
import { SharedModule }         from '../shared/shared.module';


@NgModule({
    declarations: [
        ReplyDialogComponent,
    ],
    exports: [],
    imports: [
        SharedModule
    ]
})
export class ExtensionsModule {
}
