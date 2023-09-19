import { NgModule }         from '@angular/core';
import { SharedModule }     from '../shared/shared.module';
import { AlertComponent }   from './dialog/alert/alert.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { DialogModule }     from '@angular/cdk/dialog';
import { DialogService }    from '@/app/extensions/dialog/dialog.service';
import { ArtSvgComponent } from './icon/art-svg/art-svg.component';


@NgModule({
    declarations: [
        AlertComponent,
        ConfirmComponent,
        ArtSvgComponent,
    ],
    exports: [
        ArtSvgComponent
    ],
    providers: [DialogService],
    imports: [
        DialogModule,
        SharedModule
    ]
})
export class ExtensionsModule {
}
