import { Component, OnInit, ViewChild }       from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog }                          from "@angular/material/dialog";
import { AreaDialogComponent }                from "./area-dialog/area-dialog.component";
import { AreaFlatNode, AreaTreeComponent }    from './area-tree/area-tree.component';
import { CollectionViewer, DataSource }       from '@angular/cdk/collections';
import { BehaviorSubject, Observable }        from 'rxjs';
import { ResultBean }                         from '../../common/result.bean';
import { HttpCollections }                    from '../../../environments/environment';
import { HttpClient }                         from '@angular/common/http';

export interface SysArea {
    areaCode: string,
    areaParentCode: string | null,
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
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/area/get', {params: {areaParentCode: areaCode}})
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

    public selectedNode: AreaFlatNode | null = null;
    public dataSource: SysAreaDataSource;
    public displayedColumns: ['areaCode', 'areaName', 'areaDescription'] = ['areaCode', 'areaName', 'areaDescription'];

    constructor(private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private httpClient: HttpClient) {
        this.dataSource = new SysAreaDataSource(httpClient);
    }

    ngOnInit(): void {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(AreaDialogComponent, {
            width: '480px',
            data: {
                ...this.selectedNode
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (this.selectedNode != null) {
                this.dataSource.changeData(this.selectedNode.areaCode);
            }
        });
    }

    changeSelectedNode(node: AreaFlatNode) {
        this.selectedNode = node;
        this.dataSource.changeData(this.selectedNode.areaCode);
    }

    public assertAreaType(item: SysArea): SysArea {
        return item;
    }

}
