import { Component, EventEmitter, Output }               from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable }       from 'rxjs';
import { FlatTreeControl }                               from '@angular/cdk/tree';
import { HttpClient }                                    from '@angular/common/http';
import { ResultBean }                                    from '@/app/common/result.bean';
import { HttpCollections }                               from '@/environments/environment';

// tree node数据结构
export class DeptFlatNode {
    constructor(
        public deptId: string,
        public deptCode: string,
        public parentId: string | null,
        public expandCode: string | null,
        public deptName: string,
        public level = 1,
        public expandable = false,
        public isLoading = false,
    ) {
    }
}

// tree datasource
export class deptFlatNodeDataSource implements DataSource<DeptFlatNode> {

    dataChange = new BehaviorSubject<DeptFlatNode[]>([]);

    get data(): DeptFlatNode[] {
        return this.dataChange.value;
    }

    set data(value: DeptFlatNode[]) {
        // this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private _treeControl: FlatTreeControl<DeptFlatNode>,
                private httpClient: HttpClient) {
    }

    // 初始化数据
    initialData(): deptFlatNodeDataSource {
        // this._treeControl.dataNodes = [new deptFlatNode("0", null, "0", "部门", 1, true, false)];
        // this.data = this._treeControl.dataNodes;
        this.data = [new DeptFlatNode('0', '0', '0', null, '部门', 0, true)];
        return this;
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<DeptFlatNode>).added ||
                (change as SelectionChange<DeptFlatNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<DeptFlatNode>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => {
            return this.data;
        }));
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    // 控制展开和折叠
    handleTreeControl(change: SelectionChange<DeptFlatNode>) {
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

    toggleNode(node: DeptFlatNode, expand: boolean) {
        const index = this.data.findIndex((dept) => dept.deptId === node.deptId);
        if (expand) {
            this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/dept/get', {params: {parentId: node.deptId}})
                .subscribe((response) => {
                    let deptList = response.data as any[];
                    if (deptList.length === 0) {
                        // node.expandable = false;
                        this.data[index] = new DeptFlatNode(node.deptId, node.deptCode, node.parentId, node.expandCode, node.deptName, node.level, false);
                    } else {
                        deptList = deptList.map((dept) => new DeptFlatNode(dept.deptId, dept.deptCode, dept.deptParentCode, dept.expandCode, dept.deptName, node.level + 1, true));
                        this.data.splice(index + 1, 0, ...deptList);
                    }
                    this.dataChange.next([...this.data]);
                });
        } else {
            let count = 0;
            for (let i = index + 1; i < this.data.length && this.data[i].level > node.level; i++) {
                count++
            }
            this.data.splice(index + 1, count);
            this.dataChange.next(this.data);
        }
    }

}

@Component({
    selector: 'depart-tree',
    templateUrl: './depart-tree.component.html',
    styleUrls: ['./depart-tree.component.scss']
})
export class DepartTreeComponent {

    public treeControl: FlatTreeControl<DeptFlatNode>;
    public dataSource: deptFlatNodeDataSource;

    @Output()
    public changeSelectedNode = new EventEmitter<DeptFlatNode>();

    public selectedNode: DeptFlatNode | null = null;

    constructor(private httpClient: HttpClient,) {
        this.treeControl = new FlatTreeControl<DeptFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new deptFlatNodeDataSource(this.treeControl, httpClient).initialData();
    }

    ngOnInit(): void {
        this.selectNode(this.dataSource.data[0]);
    }

    getLevel = (node: DeptFlatNode) => node.level;

    isExpandable = (node: DeptFlatNode) => {
        return node.expandable;
    }

    hasChild = (_: number, _nodeData: DeptFlatNode) => {
        return _nodeData.expandable;
    };

    selectNode(node: DeptFlatNode) {
        if (this.selectedNode === null || this.selectedNode.deptCode !== node.deptCode) {
            this.selectedNode = node;
            this.changeSelectedNode.emit(node);
        }
    }

    /**
     * 如果某个node下的children被修改了，
     * 这个方法负责刷新显示children
     * @param deptFlatNode 要刷新的node
     */
    refreshExpand(deptFlatNode: DeptFlatNode) {
        // 先关闭在展开，刷新children显示
        if (this.treeControl.isExpanded(deptFlatNode)) {
            this.treeControl.collapse(deptFlatNode);
            this.treeControl.expand(deptFlatNode);
        }
    }

    public assertDeptNodeType(item: DeptFlatNode): DeptFlatNode {
        return item;
    }

}
