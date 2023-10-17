import { Component, Inject, OnInit }                from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient }                               from '@angular/common/http';
import { MatSnackBar }                              from '@angular/material/snack-bar';
import { SysArea }                                  from '../area.component';
import { HttpCollections }                          from '@/environments/environment';
import { ResultBean }                               from '@/app/common/result.bean';
import { ArtDialogService }                         from '@think-make/art-extends/art-dialog';
import { Model }                                    from '@/app/common/model';

@Component({
    selector: 'app-area-dialog',
    templateUrl: './area-dialog.component.html',
    styleUrls: ['./area-dialog.component.scss']
})
export class AreaDialogComponent implements OnInit {

    protected readonly Model = Model;
    public areaForm: FormGroup;
    public parent: SysArea | null = null;

    constructor(private formBuilder: FormBuilder,
                private httpClient: HttpClient,
                private matDialogRef: MatDialogRef<AreaDialogComponent>,
                private matDialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public data: { model: Model, parent: SysArea, record: SysArea },
                private matSnackBar: MatSnackBar,
                private artDialogService: ArtDialogService) {
        this.parent = data.parent;
        if (data.model === Model.Create) {
            this.areaForm = this.formBuilder.group({
                parentId: [this.parent.areaId, [Validators.required]],
                areaCode: ['', [Validators.required, Validators.minLength(4)]],
                areaName: ['', [Validators.required]],
                areaDescription: ['', []]
            });
        } else {
            const record = data.record;
            this.areaForm = this.formBuilder.group({
                areaId: [record.areaId, [Validators.required]],
                parentId: [this.parent.areaId, [Validators.required]],
                areaCode: [{value: record.areaCode, disabled: true}, [Validators.required, Validators.minLength(4)]],
                areaName: [record.areaName, [Validators.required]],
                areaDescription: [record.areaDescription, [Validators.required]]
            });
        }
    }

    ngOnInit(): void {
    }

    // 创建区域
    public createArea(): void {
        let param = {...this.areaForm.getRawValue()};
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/area/add', param)
            .subscribe((resultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.artDialogService.success('创建区域成功!', {duration: 3000});
                } else {
                    this.artDialogService.error('创建区域失败!', {duration: 3000});
                }
            });
    }

    // 修改
    public updateArea(): void {
        let param = {...this.areaForm.getRawValue()};
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/area/update', param)
            .subscribe((resultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.artDialogService.success('修改区域成功!', {duration: 3000});
                } else {
                    this.artDialogService.error('修改区域成功!', {duration: 3000});
                }
            });
    }
}
