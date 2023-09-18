import { Component, Inject }                  from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef }      from '@angular/material/dialog';
import { SysMenu }                            from '@/app/routes/system/menu/menu.component';
import { HttpClient }                         from '@angular/common/http';
import { HttpCollections }                    from '@/environments/environment';
import { ResultBean }                         from '@/app/common/result.bean';
import { Validations }                        from '@/app/extensions/validation/validation';
import { DialogService }                      from '@/app/extensions/dialog/dialog.service';

@Component({
    selector: 'app-menu-dialog',
    templateUrl: './menu-dialog.component.html',
    styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent {

    public menuForm: FormGroup;

    constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<MenuDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public parent: SysMenu, private dialogService: DialogService) {
        this.menuForm = this.formBuilder.group({
            parentId: [parent.menuId, [Validators.required]],
            menuCode: ['', [Validators.required, Validators.minLength(4), Validations.numEngUnderline()]],
            menuName: ['', [Validators.required]],
            menuDescription: ['', []]
        });
    }

    createMenu() {
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/menu/add', this.menuForm.getRawValue())
            .subscribe(response => {
                if (response.code === 200) {
                    this.matDialogRef.close(true);
                    this.dialogService.alert('success', '菜单添加成功！', {duration: 2000});
                } else {
                    this.dialogService.alert('error', '菜单添加失败！', {duration: 2000});
                }
            });
    }
}
