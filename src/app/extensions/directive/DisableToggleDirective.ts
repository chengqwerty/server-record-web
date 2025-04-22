import { Directive, Input } from '@angular/core';
import { MatSlideToggle }   from '@angular/material/slide-toggle';

@Directive({
    selector: '[disableToggle]'
})
export class DisableToggleDirective {
    @Input() set disableToggle(value: boolean) {
        this.slide.toggleChange.closed = true;
    }

    constructor(private slide: MatSlideToggle) {
    }
}
