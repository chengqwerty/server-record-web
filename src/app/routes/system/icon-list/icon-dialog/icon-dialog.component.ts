import { Component, Inject } from '@angular/core';

import { iconDirectory }                 from '@/app/extensions/icon/icon';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'icon-dialog',
    templateUrl: './icon-dialog.component.html',
    styleUrls: ['./icon-dialog.component.scss']
})
export class IconDialogComponent {
    protected readonly iconDirectory = iconDirectory;

    public iconName: string | null = null;

    constructor(private matDialogRef: MatDialogRef<IconDialogComponent>, @Inject(MAT_DIALOG_DATA) iconName: string) {
        this.iconName = iconName;
    }

    selectIcon(name: string) {
        this.iconName = name;
    }

    deleteIcon() {
        this.iconName = null;
    }

    closeDialog() {
        this.matDialogRef.close(this.iconName);
    }

}
