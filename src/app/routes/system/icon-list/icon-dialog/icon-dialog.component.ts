import { Component } from '@angular/core';

import { iconDirectory }                      from '@/app/extensions/icon/icon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Validations }                        from '@/app/extensions/validation/validation';

@Component({
    selector: 'icon-dialog',
    templateUrl: './icon-dialog.component.html',
    styleUrls: ['./icon-dialog.component.scss']
})
export class IconDialogComponent {
    protected readonly iconDirectory = iconDirectory;

    public iconForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.iconForm = this.formBuilder.group({
            iconName: [null, []]
        });
    }
}
