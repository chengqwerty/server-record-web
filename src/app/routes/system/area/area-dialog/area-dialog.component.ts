import { Component, Inject, OnInit }                from '@angular/core';
import { FormBuilder, FormGroup, Validators }       from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient }                               from '@angular/common/http';
import { MatSnackBar }                              from '@angular/material/snack-bar';
import { SysArea }                                  from '../area.component';
import { HttpCollections }                          from '@/environments/environment';
import { ResultBean }                               from '@/app/common/result.bean';
import { ArtDialogService }                         from '@think-make/art-extends/art-dialog';

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
                private artDialogService: ArtDialogService) {
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
            .subscribe((resultBean) => {
                if (resultBean.code === 200) {
                    this.matDialogRef.close(true);
                    this.artDialogService.success('', {duration: 2000, message: ''});
                } else {
                    this.artDialogService.error('', {duration: 2000, message: ''});
                }
            });
    }

}
