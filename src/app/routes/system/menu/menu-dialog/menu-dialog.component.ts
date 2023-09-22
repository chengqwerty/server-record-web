import { Component, Inject }                        from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SysMenu }                                  from '@/app/routes/system/menu/menu.component';
import { HttpClient }                               from '@angular/common/http';
import { HttpCollections }                          from '@/environments/environment';
import { ResultBean }                               from '@/app/common/result.bean';
import { Validations }                              from '@/app/extensions/validation/validation';
import { DialogService }                            from '@/app/extensions/dialog/dialog.service';
import { IconDialogComponent }                      from '@/app/routes/system/icon-list/icon-dialog/icon-dialog.component';
import { Model }                                    from '@/app/common/model';

@Component({
    selector: 'app-menu-dialog',
    templateUrl: './menu-dialog.component.html',
    styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialogComponent {

    protected readonly Model = Model;
    public menuForm: FormGroup;
    public parent: SysMenu | null = null;

    constructor(private httpClient: HttpClient,
                private formBuilder: FormBuilder,
                private matDialog: MatDialog,
                private matDialogRef: MatDialogRef<MenuDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { model: Model, parent: SysMenu, record: SysMenu },
                private dialogService: DialogService) {
        this.parent = data.parent;
        if (data.model === Model.Create) {
            this.menuForm = this.formBuilder.group({
                parentId: [this.parent.menuId, [Validators.required]],
                menuCode: [null, [Validators.required, Validators.minLength(4), Validations.numEngUnderline()]],
                menuName: [null, [Validators.required]],
                menuType: [null, [Validators.required]],
                menuIcon: [null, []],
                menuLink: [null, []],
                menuDescription: [null, []]
            });
        } else {
            const record = data.record;
            this.menuForm = this.formBuilder.group({
                parentId: [this.parent.menuId, [Validators.required]],
                menuCode: [record.menuCode, [Validators.required, Validators.minLength(4), Validations.numEngUnderline()]],
                menuName: [record.menuName, [Validators.required]],
                menuType: [record.menuType, [Validators.required]],
                menuIcon: [record.menuIcon, []],
                menuLink: [record.menuLink, []],
                menuDescription: [record.menuDescription, []]
            });
        }
    }

    /**
     * 打开图标弹窗
     * @param $event
     */
    openIconDialog($event: MouseEvent) {
        // 阻止事件传播防止影响表单行为（比如触发表单检测）
        $event.preventDefault();
        const dialogRef = this.matDialog.open(IconDialogComponent, {
            data: this.menuForm?.get('menuIcon')?.value
        });
        dialogRef.afterClosed().subscribe((iconName: string) => {
            if (iconName) {
                this.menuForm?.get('menuIcon')?.setValue(iconName);
            }
        });
    }

    clearIcon() {
        this.menuForm?.get('menuIcon')?.setValue(null);
    }

    createMenu() {
        if (this.menuForm?.get('menuType')?.value === 1) {
            this.menuForm?.get('menuLink')?.setValue(null);
        }
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/menu/add', this.menuForm?.getRawValue())
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
