import { NgModule }         from '@angular/core';
import { SharedModule }     from '../shared/shared.module';
import { ArtSvgComponent }  from './icon/art-svg/art-svg.component';
import { PropertiesPipe }   from '@/app/extensions/pipe/properties';


@NgModule({
    declarations: [
        ArtSvgComponent,
        PropertiesPipe,
    ],
    exports: [
        ArtSvgComponent,
        PropertiesPipe
    ],
    providers: [],
    imports: [
        SharedModule
    ]
})
export class ExtensionsModule {
}
