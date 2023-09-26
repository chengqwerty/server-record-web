import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { MaterialModule }      from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ArtDialogModule }     from '@think-make/art-extends/art-dialog';

const THIRD_MODULE = [
    MaterialModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        ArtDialogModule,
        ...THIRD_MODULE
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        ArtDialogModule,
        ...THIRD_MODULE
    ]
})
export class SharedModule {
}
