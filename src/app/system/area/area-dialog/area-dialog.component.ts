import { Component, Inject, OnInit }                from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HttpClient }                               from "@angular/common/http";
import { HttpCollections }                          from "../../../../environments/environment";
import { ResultBean }                               from "../../../common/result.bean";
import { MatSnackBar }                              from "@angular/material/snack-bar";
import { ReplyDialogService }                       from "../../../extensions/reply-dialog/reply-dialog.service";
import { SysArea }                                  from '../area.component';

@Component({
    selector: 'app-area-dialog',
    templateUrl: './area-dialog.component.html',
    styleUrls: ['./area-dialog.component.scss']
})
export class AreaDialogComponent implements OnInit {

    public areaForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private httpClient: HttpClient,
                private matDialogRef: MatDialogRef<AreaDialogComponent>,
                private matDialog: MatDialog,
                @Inject(MAT_DIALOG_DATA) public parentArea: SysArea,
                private matSnackBar: MatSnackBar,
                private rds: ReplyDialogService) {
        this.areaForm = this.formBuilder.group({
            areaCode: ['', [Validators.required]],
            areaName: ['', [Validators.required]],
            remarks: ['', []]
        });
    }

    ngOnInit(): void {
    }

    // 创建区域
    public createArea(): void {
        let param = {...this.areaForm.getRawValue(), areaParentCode: this.parentArea.areaCode};
        this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/area/add', param)
            .subscribe((resultBean: ResultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.rds.open('success', '添加区域成功', {duration: 2000});
                } else {
                    this.rds.open('error', resultBean.message);
                }
            });
    }

}
