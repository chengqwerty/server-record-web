import { Component, EventEmitter, Output }               from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable }       from 'rxjs';
import { NestedTreeControl }                             from '@angular/cdk/tree';
import { HttpClient }                                    from '@angular/common/http';
import { ResultBean }                                    from '@/app/common/result.bean';
import { HttpCollections }                               from '@/environments/environment';
import { AreaFlatNode }                                  from '@/app/routes/system/area/area-tree/area-tree.component';


// tree node数据结构
export class MenuTreeNode {

    public children: BehaviorSubject<MenuTreeNode[]> = new BehaviorSubject<MenuTreeNode[]>([]);

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
        public obtain: boolean
    ) {
    }

}

// tree datasource
export class MenuTreeDataSource implements DataSource<MenuTreeNode> {

    dataChange = new BehaviorSubject<MenuTreeNode[]>([]);

    get data(): MenuTreeNode[] {
        return this.dataChange.value;
    }

    set data(value: MenuTreeNode[]) {
        // this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private _treeControl: NestedTreeControl<MenuTreeNode>,
                private _httpClient: HttpClient) {
    }

    // 初始化数据
    initialData(): MenuTreeDataSource {
        this.data = [new MenuTreeNode('0', '', '菜单', '', 1, null, null, null, 0, false)];
        return this;
    }

    connect(collectionViewer: CollectionViewer): Observable<MenuTreeNode[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            console.log(change);
            if ((change as SelectionChange<MenuTreeNode>).added || (change as SelectionChange<MenuTreeNode>).removed) {
                this.handleTreeControl(change as SelectionChange<MenuTreeNode>);
            }
        });
        return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => {
            return this.data;
        }));
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    /** Handle expand/collapse behaviors */
    handleTreeControl(change: SelectionChange<MenuTreeNode>) {
        if (change.added) {
            change.added.forEach(node => this.toggleNode(node, true));
        }
    }

    toggleNode(node: MenuTreeNode, expand: boolean) {
        console.log(node.obtain)
        if (!node.obtain) {
            this._httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/menu/getListByParent?parentId=' + node.menuId).subscribe(response => {
                if (response.code === 200) {
                    node.obtain = true;
                    node.children.next((response.data as [any]).map(data => {
                        return new MenuTreeNode(data.menuId, data.menuCode, data.menuName, data.menuDescription, data.menuType, data.menuLink, data.menuIcon, data.parentId, data.menuVisible, false);
                    }));
                } else {
                    if (response.message) {
                        // 等待完善
                    } else {
                        // 等待完善
                    }
                }
            });
        }
    }

}

@Component({
    selector: 'app-menu-tree',
    templateUrl: './menu-tree.component.html',
    styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

    @Output()
    public changeSelectedNode = new EventEmitter<string>();

    public treeControl: NestedTreeControl<any>;
    public dataSource: MenuTreeDataSource;

    public selectedNode: MenuTreeNode | null = null;

    constructor(private httpClient: HttpClient) {
        this.treeControl = new NestedTreeControl<MenuTreeNode>(node => node.children);
        this.dataSource = new MenuTreeDataSource(this.treeControl, this.httpClient).initialData();

    }

    hasChild(index: number, treeNode: MenuTreeNode): boolean {
        return treeNode.menuType === 1;
    }

    selectNode(node: MenuTreeNode) {
        if (this.selectedNode === null || this.selectedNode.menuId !== node.menuId) {
            this.selectedNode = node;
            this.changeSelectedNode.emit(node.menuId);
        }
    }

    public assertNodeType(item: MenuTreeNode): MenuTreeNode {
        return item;
    }

}
