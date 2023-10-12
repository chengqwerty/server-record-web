import { Component, OnInit, ViewChild }       from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog }                          from '@angular/material/dialog';
import { AreaDialogComponent }                from './area-dialog/area-dialog.component';
import { AreaFlatNode, AreaTreeComponent }    from './area-tree/area-tree.component';
import { CollectionViewer, DataSource }       from '@angular/cdk/collections';
import { BehaviorSubject, Observable }        from 'rxjs';
import { HttpCollections }                    from '@/environments/environment';
import { HttpClient }                         from '@angular/common/http';
import { ResultBean }                         from '@/app/common/result.bean';
import { Model }                              from '@/app/common/model';
import { ArtDialogService }                   from '@think-make/art-extends/art-dialog';

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

    changeData(areaCode: string) {
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/area/get', {params: {parentId: areaCode}})
            .subscribe((response) => {
                let areas = response.data as any[];
                this.areaSubject.next(areas);
            });
    }

}

@Component({
    selector: 'app-area',
    templateUrl: './area.component.html',
    styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

    @ViewChild(AreaTreeComponent)
    private areaTree: AreaTreeComponent | undefined;

    public areaTreeNode: AreaFlatNode | null = null;
    public dataSource: SysAreaDataSource;
    public displayedColumns = ['areaCode', 'areaName', 'areaDescription'];

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
        const dialogRef = this.dialog.open(AreaDialogComponent, {
            width: '480px',
            data: {
                model: Model.Create,
                parent: {
                    areaId: this.areaTreeNode?.areaId,
                    areaCode: this.areaTreeNode?.areaCode,
                    areaName: this.areaTreeNode?.areaName
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (this.areaTreeNode != null) {
                this.dataSource.changeData(this.areaTreeNode.areaCode);
            }
        });
    }

    changeSelectedNode(node: AreaFlatNode) {
        this.areaTreeNode = node;
        this.dataSource.changeData(this.areaTreeNode.areaCode);
    }

    public assertAreaType(item: SysArea): SysArea {
        return item;
    }

}
