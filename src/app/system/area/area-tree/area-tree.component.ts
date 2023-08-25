import { Component, EventEmitter, OnInit, Output }       from '@angular/core';
import { HttpCollections }                               from '../../../../environments/environment';
import { ResultBean }                                    from '../../../common/result.bean';
import { HttpClient }                                    from '@angular/common/http';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable }       from 'rxjs';
import { FlatTreeControl }                               from '@angular/cdk/tree';
import { SysArea }                                       from "../area.component";

// tree node数据结构
export class AreaFlatNode {
    constructor(
        public areaCode: string,
        public areaParentCode: string | null,
        public expandCode: string,
        public areaName: string,
        public level = 1,
        public expandable = false,
        public isLoading = false,
    ) {
    }
}

// tree datasource
export class AreaFlatNodeDataSource implements DataSource<AreaFlatNode> {

    dataChange = new BehaviorSubject<AreaFlatNode[]>([]);

    get data(): AreaFlatNode[] {
        return this.dataChange.value;
    }

    set data(value: AreaFlatNode[]) {
        // this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private _treeControl: FlatTreeControl<AreaFlatNode>,
                private httpClient: HttpClient) {
    }

    // 初始化数据
    initialData(): AreaFlatNodeDataSource {
        // this._treeControl.dataNodes = [new AreaFlatNode("0", null, "0", "区域", 1, true, false)];
        // this.data = this._treeControl.dataNodes;
        this.data = [new AreaFlatNode("0", null, "0", "区域", 1, true, false)];
        return this;
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<AreaFlatNode>).added ||
                (change as SelectionChange<AreaFlatNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<AreaFlatNode>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => {
            console.log(this.data);
            return this.data;
        }));
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    // 控制展开和折叠
    handleTreeControl(change: SelectionChange<AreaFlatNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
        if (change.removed) {
            change.removed
                .slice()
                .reverse()
                .forEach(node => this.toggleNode(node, false));
        }
    }

    toggleNode(node: AreaFlatNode, expand: boolean) {
        const index = this.data.indexOf(node);
        if (expand) {
            this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/area/get', {params: {areaParentCode: node.areaCode}})
                .subscribe((response) => {
                    let areas = response.data as any[];
                    if (areas.length === 0) {
                        node.expandable = false;
                        this.data[index] = new AreaFlatNode(node.areaCode, node.areaParentCode, node.expandCode, node.areaName, node.level, false);
                    } else {
                        areas = areas.map((area) => new AreaFlatNode(area.areaCode, area.areaParentCode, area.expandCode, area.areaName, node.level + 1));
                        this.data.splice(index + 1, 0, ...areas);
                    }
                    this.dataChange.next([...this.data]);
                });
        } else {
            let count = 0;
            for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++) {
                count++
            }
            console.log(this.data.length);
            this.data.splice(index + 1, count);
            console.log(this.data.length);
            this.dataChange.next(this.data);
        }
    }

}

@Component({
    selector: 'app-area-tree',
    templateUrl: './area-tree.component.html',
    styleUrls: ['./area-tree.component.scss']
})
export class AreaTreeComponent implements OnInit {

    public treeControl: FlatTreeControl<AreaFlatNode>;
    public dataSource: AreaFlatNodeDataSource;

    @Output()
    public changeSelectedNode = new EventEmitter<AreaFlatNode>();

    public selectedNode: AreaFlatNode | null = null;

    constructor(private httpClient: HttpClient,) {
        this.treeControl = new FlatTreeControl<AreaFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new AreaFlatNodeDataSource(this.treeControl, httpClient).initialData();
    }

    ngOnInit(): void {
    }

    getLevel = (node: AreaFlatNode) => node.level;

    isExpandable = (node: AreaFlatNode) => {
        console.log(node.expandable);
        return node.expandable;
    }

    hasChild = (_: number, _nodeData: AreaFlatNode) => {
        return _nodeData.expandable;
    };

    selectNode(node: AreaFlatNode) {
        if (this.selectedNode === null || this.selectedNode.areaCode !== node.areaCode) {
            this.selectedNode = node;
            this.changeSelectedNode.emit(node);
        }
    }

    public assertAreaNodeType(item: AreaFlatNode): AreaFlatNode {
        return item;
    }

    protected readonly AreaFlatNode = AreaFlatNode;
}
