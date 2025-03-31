import { Component, OnInit, ViewChild }    from '@angular/core';
import { FormBuilder }                     from '@angular/forms';
import { MatDialog }                       from '@angular/material/dialog';
import { AreaDialogComponent }             from './area-dialog/area-dialog.component';
import { AreaFlatNode, AreaTreeComponent } from './area-tree/area-tree.component';
import { CollectionViewer, DataSource }    from '@angular/cdk/collections';
import { BehaviorSubject, Observable }     from 'rxjs';
import { HttpCollections }                 from '@/environments/environment';
import { HttpClient }                      from '@angular/common/http';
import { ResultBean }                      from '@/app/common/result.bean';
import { Model }                           from '@/app/common/model';
import { ArtDialogService }                from '@think-make/art-extends/art-dialog';

export interface SysArea {
    areaId: string,
    areaCode: string,
    parentId: string,
    expandCode: string,
    areaName: string,
    areaDescription: string
}

export class SysAreaDataSource implements DataSource<SysArea> {

    private areaSubject: BehaviorSubject<SysArea[]> = new BehaviorSubject<SysArea[]>([]);

    constructor(private httpClient: HttpClient) {

    }

    connect(collectionViewer: CollectionViewer): Observable<SysArea[]> {
        return this.areaSubject;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    changeData(areaId: string) {
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/area/get', {params: {parentId: areaId}})
            .subscribe((response) => {
                let areas = response.data as any[];
                this.areaSubject.next(areas);
            });
    }

}

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    standalone: false,
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    @ViewChild(AreaTreeComponent)
    private areaTreeComponent!: AreaTreeComponent;

    public areaTreeNode: AreaFlatNode | null = null;
    public dataSource: SysAreaDataSource;
    public displayedColumns = ['areaCode', 'areaName', 'areaDescription', 'action'];

    constructor(private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private artDialogService: ArtDialogService,
                private httpClient: HttpClient) {
        this.dataSource = new SysAreaDataSource(httpClient);
    }

    ngOnInit(): void {
    }

    addArea(): void {
        if (this.areaTreeNode == null) {
            this.artDialogService.warning('你必须先选择一个父区域！');
            return;
        }
        this.dialog.open(AreaDialogComponent, {
            data: {
                model: Model.Create,
                parent: {
                    areaId: this.areaTreeNode?.areaId,
                    areaCode: this.areaTreeNode?.areaCode,
                    areaName: this.areaTreeNode?.areaName
                }
            }
        }).afterClosed().subscribe(result => {
            this.refreshEmit()
        });
    }

    viewArea(sysArea: SysArea) {
        this.dialog.open(AreaDialogComponent, {
            width: '640px',
            data: {
                model: Model.Read,
                parent: {
                    areaId: this.areaTreeNode?.areaId,
                    areaCode: this.areaTreeNode?.areaCode,
                    areaName: this.areaTreeNode?.areaName
                },
                record: {
                    ...sysArea
                }
            }
        });
    }

    updateArea(sysArea: SysArea) {
        this.dialog.open(AreaDialogComponent, {
            data: {
                model: Model.Update,
                parent: {
                    areaId: this.areaTreeNode?.areaId,
                    areaCode: this.areaTreeNode?.areaCode,
                    areaName: this.areaTreeNode?.areaName
                },
                record: {
                    ...sysArea
                }
            }
        }).afterClosed().subscribe(result => {
            this.refreshEmit()
        });
    }

    deleteArea(sysArea: SysArea) {
        this.artDialogService.confirm('删除区域', '确认删除这个区域吗？删除后无法恢复！', {type: 'warn'})
            .afterClosed().subscribe(result => {
                if (result) {
                    this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/area/delete', sysArea)
                        .subscribe((resultBean) => {
                            if (resultBean.code === 200) {
                                this.artDialogService.success('删除区域成功!', {duration: 3000});
                                this.refreshEmit();
                            } else {
                                this.artDialogService.error('删除区域失败!', {duration: 3000});
                            }
                        });
                }
        });
    }

    refreshEmit() {
        if (this.areaTreeNode != null) {
            this.dataSource.changeData(this.areaTreeNode.areaId);
            this.areaTreeComponent.refreshExpand(this.areaTreeNode);
        }
    }

    changeSelectedNode(node: AreaFlatNode) {
        this.areaTreeNode = node;
        this.dataSource.changeData(this.areaTreeNode.areaId);
    }

    public assertAreaType(item: SysArea): SysArea {
        return item;
    }

}
