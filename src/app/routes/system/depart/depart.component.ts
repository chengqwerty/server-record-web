import { Component, ViewChild }              from '@angular/core';
import { FormBuilder }                       from '@angular/forms';
import { DeptFlatNode, DepartTreeComponent } from '@/app/routes/system/depart/depart-tree/depart-tree.component';
import { MatDialog }                         from '@angular/material/dialog';
import { ArtDialogService }                  from '@think-make/art-extends/art-dialog';
import { HttpClient }                        from '@angular/common/http';
import { DepartDialogComponent }             from '@/app/routes/system/depart/depart-dialog/depart-dialog.component';
import { Model }                             from '@/app/common/model';
import { ResultBean }                        from '@/app/common/result.bean';
import { HttpCollections }                   from '@/environments/environment';
import { CollectionViewer, DataSource }      from '@angular/cdk/collections';
import { BehaviorSubject, Observable }       from 'rxjs';

export interface SysDept {
    deptId: string,
    deptCode: string,
    parentId: string,
    expandCode: string,
    deptName: string,
    deptDescription: string
}

export class SysDeptDataSource implements DataSource<SysDept> {

    private subject: BehaviorSubject<SysDept[]> = new BehaviorSubject<SysDept[]>([]);

    constructor(private httpClient: HttpClient) {

    }

    connect(collectionViewer: CollectionViewer): Observable<SysDept[]> {
        return this.subject;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    changeData(deptId: string) {
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/dept/getListByParent', {params: {parentId: deptId}})
            .subscribe((response) => {
                if (response.code === 200) {
                    let deptList = response.data as SysDept[];
                    this.subject.next(deptList);
                }
            });
    }

}


@Component({
    selector: 'app-depart',
    standalone: false,
    templateUrl: './depart.component.html',
    styleUrls: ['./depart.component.scss']
})
export class DepartComponent {

    @ViewChild(DepartTreeComponent)
    private deptTreeComponent!: DepartTreeComponent;

    public deptTreeNode: DeptFlatNode | null = null;
    public dataSource: SysDeptDataSource;
    public displayedColumns = ['deptCode', 'deptName', 'deptDescription', 'action'];

    constructor(private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private artDialogService: ArtDialogService,
                private httpClient: HttpClient) {
        this.dataSource = new SysDeptDataSource(httpClient);
    }

    ngOnInit(): void {
    }

    addDept(): void {
        if (this.deptTreeNode == null) {
            this.artDialogService.warning('你必须先选择一个父部门！');
            return;
        }
        this.dialog.open(DepartDialogComponent, {
            data: {
                model: Model.Create,
                parent: {
                    deptId: this.deptTreeNode?.deptId,
                    deptCode: this.deptTreeNode?.deptCode,
                    deptName: this.deptTreeNode?.deptName
                }
            }
        }).afterClosed().subscribe(result => {
            this.refreshEmit()
        });
    }

    viewDept(sysDept: SysDept) {
        this.dialog.open(DepartDialogComponent, {
            width: '640px',
            data: {
                model: Model.Read,
                parent: {
                    deptId: this.deptTreeNode?.deptId,
                    deptCode: this.deptTreeNode?.deptCode,
                    deptName: this.deptTreeNode?.deptName
                },
                record: {
                    ...sysDept
                }
            }
        });
    }

    updateDept(sysDept: SysDept) {
        this.dialog.open(DepartDialogComponent, {
            data: {
                model: Model.Update,
                parent: {
                    deptId: this.deptTreeNode?.deptId,
                    deptCode: this.deptTreeNode?.deptCode,
                    deptName: this.deptTreeNode?.deptName
                },
                record: {
                    ...sysDept
                }
            }
        }).afterClosed().subscribe(result => {
            console.log('update dept result', result);
            this.refreshEmit()
        });
    }

    deleteDept(sysDept: SysDept) {
        this.artDialogService.confirm('删除部门', '确认删除这个部门吗？删除后无法恢复！', {type: 'warning'})
            .afterClosed().subscribe(result => {
            if (result) {
                this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/dept/delete', sysDept)
                    .subscribe((resultBean) => {
                        if (resultBean.code === 200) {
                            this.artDialogService.success('删除部门成功!', {duration: 3000});
                            this.refreshEmit();
                        } else {
                            this.artDialogService.error('删除部门失败!', {duration: 3000});
                        }
                    });
            }
        });
    }

    refreshEmit() {
        if (this.deptTreeNode != null) {
            this.dataSource.changeData(this.deptTreeNode.deptId);
            this.deptTreeComponent.refreshNode(this.deptTreeNode);
        }
    }

    changeSelectedNode(node: DeptFlatNode) {
        this.deptTreeNode = node;
        this.dataSource.changeData(this.deptTreeNode.deptId);
    }

    public assertDeptType(item: SysDept): SysDept {
        return item;
    }
}
