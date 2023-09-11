import { Component }                                     from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable } from 'rxjs';
import { FlatTreeControl, NestedTreeControl }      from '@angular/cdk/tree';
import { HttpClient }                              from '@angular/common/http';
import { ResultBean }                                    from '@/app/common/result.bean';
import { HttpCollections }                               from '@/environments/environment';


// tree node数据结构
export class MenuTreeNode {
    constructor(
        public menuId: string,
        public menuCode: string,
        public menuName: string,
        public menuDescription: string,
        public menuType: number,
        public menuLink: string,
        public menuIcon: string,
        public parentId: string,
        public menuVisible: number,
        public children: number
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
                private httpClient: HttpClient) {
    }

    // 初始化数据
    initialData(): MenuTreeNode[] {
        return [];
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return new Observable<any[]>();
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

}

class DynamicDatabase {
}

@Component({
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

    public treeControl: NestedTreeControl<any>;
    public dataSource: MenuTreeDataSource;

    constructor(private httpClient: HttpClient) {
        this.treeControl = new NestedTreeControl<MenuTreeNode>(this.getChildren);
        this.dataSource = new MenuTreeDataSource(this.treeControl, httpClient);
    }

    getChildren(node: MenuTreeNode): Observable<MenuTreeNode[]> {
        return new Observable<MenuTreeNode[]>();
    }
}
