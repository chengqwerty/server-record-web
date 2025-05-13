import { ChangeDetectorRef, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange }                 from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable }       from 'rxjs';
import { HttpClient }                                    from '@angular/common/http';
import { ResultBean }                                    from '@/app/common/result.bean';
import { HttpCollections }                               from '@/environments/environment';
import { SysDept }              from '@/app/routes/system/depart/depart.component';
import { MatTree, MatTreeNode } from '@angular/material/tree';

// tree node数据结构
export class DeptFlatNode {

    public children: BehaviorSubject<DeptFlatNode[]> = new BehaviorSubject<DeptFlatNode[]>([]);

    constructor(
        public deptId: string,
        public deptCode: string,
        public parentId: string | null,
        public expandCode: string | null,
        public deptName: string,
        public level = 1,
        public expandable = true,
        public expanded = false
    ) {
    }

}

export class DeptFlatNodeDataSource implements DataSource<DeptFlatNode> {

    private roots: DeptFlatNode[] = [new DeptFlatNode('0', '0', null, null, '部门', 0, true, false)];

    private subject = new BehaviorSubject<DeptFlatNode[]>([]);

    get data() {
        return this.subject.value;
    }

    constructor(private httpClient: HttpClient) {
        this.subject.next(this.roots);
    }

    connect(collectionViewer: CollectionViewer): Observable<DeptFlatNode[]> {
        return this.subject;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    /**
     * 展开某个节点
     * @param tree MatTree
     * @param node DeptFlatNode
     * @param refresh 是否重新获取children
     */
    expand(tree: MatTree<DeptFlatNode>, node: DeptFlatNode, refresh: boolean = false) {
        if (!node.expanded || refresh) {
            this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/dept/getListByParent', {params: {parentId: node.deptId}})
                .subscribe((response) => {
                    if (response.code === 200) {
                        let deptFlatNodes = (response.data as SysDept[]).map((dept) => {
                            return new DeptFlatNode(dept.deptId, dept.deptCode, dept.parentId, dept.expandCode, dept.deptName, node.level + 1, true, false);
                        });
                        node.children.next(deptFlatNodes);
                        tree.expand(node);
                    } else {
                        node.children.next([]);
                    }
                });
            node.expanded = true;
        } else {
            tree.expand(node);
        }
    }

}

@Component({
    selector: 'depart-tree',
    standalone: false,
    templateUrl: './depart-tree.component.html',
    styleUrls: ['./depart-tree.component.scss']
})
export class DepartTreeComponent {

    @ViewChild('tree', {static: true})
    private tree!: MatTree<DeptFlatNode>;

    public dataSource: DeptFlatNodeDataSource;

    @Output()
    public changeSelectedNode = new EventEmitter<DeptFlatNode>();

    public selectedNode: DeptFlatNode | null = null;

    constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef) {
        this.dataSource = new DeptFlatNodeDataSource(httpClient);
    }

    ngOnInit(): void {
        this.selectNode(this.dataSource.data[0]);
    }

    childrenAccessor = (node: DeptFlatNode) => {
        return node.children.asObservable();
    }

    hasChild = (_: number, _nodeData: DeptFlatNode) => {
        return true;
    };

    /*
     * 手动控制节点展开
     */
    expand(node: DeptFlatNode) {
        this.dataSource.expand(this.tree, node);
    }

    /*
     * 手动控制节点关闭
     */
    collapse(node: DeptFlatNode) {
        this.tree.collapse(node);
    }

    /*
     * 手动控制刷新节点。
     * 如果某个节点的children被修改了，调用这个方法刷新显示children。
     */
    refreshNode(node: DeptFlatNode) {
        if (node.expanded) {
            node.expanded = false;
            if (this.tree.isExpanded(node)) {
                this.tree.collapse(node);
                this.dataSource.expand(this.tree, node, true);
            }
        }
    }

    selectNode(node: DeptFlatNode) {
        if (this.selectedNode === null || this.selectedNode.deptCode !== node.deptCode) {
            this.selectedNode = node;
            this.changeSelectedNode.emit(node);
        }
    }

}
