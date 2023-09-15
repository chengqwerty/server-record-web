import { Component, Inject }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA }                    from '@angular/material/dialog';
import { SysArea }                            from '@/app/routes/system/area/area.component';
import { SysMenu }                            from '@/app/routes/system/menu/menu.component';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent {

    public menuForm: FormGroup;


    constructor(private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public parent: SysMenu,) {
        this.menuForm = this.formBuilder.group({
            menuCode: ['', [Validators.required]],
            menuName: ['', [Validators.required]],
            menuDescription: ['', []]
        });
    }

    createMenu() {

    }
}
