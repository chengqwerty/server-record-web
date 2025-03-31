import { Component, Inject }                        from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { HttpClient }                               from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar }                              from '@angular/material/snack-bar';
import { ArtDialogService }                         from '@think-make/art-extends/art-dialog';
import { ResultBean }                               from '@/app/common/result.bean';
import { HttpCollections }                          from '@/environments/environment';
import { Model }                                    from '@/app/common/model';
import { SysDept }                                  from '@/app/routes/system/depart/depart.component';

@Component({
    selector: 'depart-dialog',
    standalone: false,
    templateUrl: './depart-dialog.component.html',
    styleUrls: ['./depart-dialog.component.scss']
})
export class DepartDialogComponent {
    protected readonly Model = Model;
    public deptForm: FormGroup;
    public parent: SysDept | null = null;

    constructor(private formBuilder: FormBuilder,
                private httpClient: HttpClient,
                private matDialogRef: MatDialogRef<DepartDialogComponent>,
                private matDialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: { model: Model, parent: SysDept, record: SysDept },
                private matSnackBar: MatSnackBar,
                private artDialogService: ArtDialogService) {
        this.parent = data.parent;
        if (data.model === Model.Create) {
            this.deptForm = this.formBuilder.group({
                parentId: [this.parent.deptId, [Validators.required]],
                deptCode: ['', [Validators.required, Validators.minLength(4)]],
                deptName: ['', [Validators.required]],
                deptDescription: ['', []]
            });
        } else {
            const record = data.record;
            this.deptForm = this.formBuilder.group({
                deptId: [record.deptId, [Validators.required]],
                parentId: [this.parent.deptId, [Validators.required]],
                deptCode: [{value: record.deptCode, disabled: true}, [Validators.required, Validators.minLength(4)]],
                deptName: [record.deptName, [Validators.required]],
                deptDescription: [record.deptDescription, [Validators.required]]
            });
        }
    }

    ngOnInit(): void {
    }

    // 创建部门
    public createDept(): void {
        let param = {...this.deptForm.getRawValue()};
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/dept/add', param)
            .subscribe((resultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.artDialogService.success('创建部门成功!', {duration: 3000});
                } else {
                    this.artDialogService.error('创建部门失败!', {duration: 3000});
                }
            });
    }

    // 修改
    public updateDept(): void {
        let param = {...this.deptForm.getRawValue()};
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/dept/update', param)
            .subscribe((resultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.artDialogService.success('修改部门成功!', {duration: 3000});
                } else {
                    this.artDialogService.error('修改部门成功!', {duration: 3000});
                }
            });
    }
}
