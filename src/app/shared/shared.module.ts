import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { MaterialModule }        from './material.module';
import { ReactiveFormsModule }   from '@angular/forms';
import { ArtDialogModule }       from '@think-make/art-extends/art-dialog';
import { ArtDescriptionsModule } from '@think-make/art-extends/art-descriptions';

const THIRD_MODULE = [
    MaterialModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ArtDialogModule,
        ...THIRD_MODULE
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        ArtDialogModule,
        ArtDescriptionsModule,
        ...THIRD_MODULE
    ]
})
export class SharedModule {
}
