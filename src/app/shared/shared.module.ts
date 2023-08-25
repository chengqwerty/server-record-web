import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { MaterialModule }      from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

const THIRD_MODULE = [
    MaterialModule
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        ...THIRD_MODULE
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        ...THIRD_MODULE
    ]
})
export class SharedModule {
}
