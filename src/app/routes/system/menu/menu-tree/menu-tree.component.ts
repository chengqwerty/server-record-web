import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, map, Observable }                                      from 'rxjs';
import { ResultBean }                                                    from '@/app/common/result.bean';
import { HttpCollections }                                               from '@/environments/environment';
import { HttpClient }                                                    from '@angular/common/http';
import { MatNestedTreeNode, MatTree }                                    from '@angular/material/tree';
import { CollectionViewer, DataSource }                                  from '@angular/cdk/collections';


// tree node数据结构
export class MenuTreeNode {

    public children: BehaviorSubject<MenuTreeNode[]> = new BehaviorSubject<MenuTreeNode[]>([]);
    public expansion3: any;

    constructor(
        public menuId: string,
        public menuCode: string,
        public menuName: string,
        public menuDescription: string,
        public menuType: number,
        public menuLink: string | null,
        public menuIcon: string | null,
        public parentId: string | null,
        public menuVisible: number,
        public expansion: boolean
    ) {
    }

}


class MenuDataSource implements DataSource<MenuTreeNode> {

    dataChange = new BehaviorSubject<MenuTreeNode[]>([]);

    get data(): MenuTreeNode[] {
        return this.dataChange.value;
    }

    set data(value: MenuTreeNode[]) {
        this.dataChange.next(value);
        console.log(value);
    }

    constructor() {
        let node = new MenuTreeNode('0', '', '菜单', '', 1, null, null, null, 0, false);
        this.dataChange.next([node]);
    }

    connect(collectionViewer: CollectionViewer): Observable<MenuTreeNode[]> {
        collectionViewer.viewChange.subscribe((lr) => {
            console.log(lr);
        });
        return this.dataChange;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataChange.complete();
    }

}

@Component({
    selector: 'app-menu-tree',
    standalone: false,
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent implements OnInit {

    @Output()
    public changeSelectedNode = new EventEmitter<MenuTreeNode>();

    @ViewChild('tree', {static: true})
    public tree!: MatTree<MenuTreeNode>;

    // public dataSource: BehaviorSubject<MenuTreeNode[]> | MenuDataSource = new BehaviorSubject<MenuTreeNode[]>([]);
    public dataSource: MenuDataSource;

    public selectedNode: MenuTreeNode | null = null;

    constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef) {
        this.dataSource = new MenuDataSource();
    }

    ngOnInit(): void {
        this.selectNode(this.dataSource.data[0], null);
    }

    hasChild(index: number, treeNode: MenuTreeNode): boolean {
        return treeNode.menuType === 1;
    }

    selectNode(node: MenuTreeNode, event: Event | null) {
        if (event) {
            event.stopPropagation();
        }
        if (this.selectedNode === null || this.selectedNode.menuId !== node.menuId) {
            this.selectedNode = node;
            this.changeSelectedNode.emit(node);
        }
    }

    /**
     * 如果某个node下的children被修改了，
     * 这个方法负责刷新显示children
     * @param menuTreeNode 要刷新的node
     */
    refreshExpand(menuTreeNode: MenuTreeNode) {
        // 先关闭在展开，刷新children显示
        // if (this.treeControl.isExpanded(menuTreeNode)) {
        //     this.treeControl.collapse(menuTreeNode);
        //     this.treeControl.expand(menuTreeNode);
        // }
    }

    childrenAccessor = (node: MenuTreeNode) => node.children ?? [];

    expandedChange2 = (node: MenuTreeNode, event: boolean) => {
        if (!node.expansion) {
            this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/menu/getListByParent?parentId=' + node.menuId).subscribe(result => {
                if (result.code === 200) {
                    node.expansion = true;
                    // node = new MenuTreeNode('0', '', '菜d单', '', 1, null, null, null, 0, false);
                    node.children.next((result.data as any[]).map((simpleNode) => {
                        return new MenuTreeNode(simpleNode.menuId, simpleNode.menuCode, simpleNode.menuName, simpleNode.menuDescription, simpleNode.menuType, simpleNode.menuLink, simpleNode.menuIcon, simpleNode.parentId, simpleNode.menuVisible, false);
                    }));
                }
            });
        }
    }

    expansionKey = (node: MenuTreeNode) => {
        return node.expansion3;
    }

}
