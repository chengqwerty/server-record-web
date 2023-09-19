import { NgModule }         from '@angular/core';
import { SharedModule }     from '../shared/shared.module';
import { AlertComponent }   from './dialog/alert/alert.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { DialogModule }     from '@angular/cdk/dialog';
import { DialogService }    from '@/app/extensions/dialog/dialog.service';
import { ArtSvgComponent }  from './icon/art-svg/art-svg.component';
import { PropertiesPipe }   from '@/app/extensions/pipe/properties';


@NgModule({
    declarations: [
        AlertComponent,
        ConfirmComponent,
        ArtSvgComponent,
        PropertiesPipe,
    ],
    exports: [
        ArtSvgComponent,
        PropertiesPipe
    ],
    providers: [DialogService],
    imports: [
        DialogModule,
        SharedModule
    ]
})
export class ExtensionsModule {
}
