import { Component }                                     from '@angular/core';
import { CollectionViewer, DataSource, SelectionChange } from '@angular/cdk/collections';
import { BehaviorSubject, map, merge, Observable }       from 'rxjs';
import { FlatTreeControl }                               from '@angular/cdk/tree';
import { HttpClient }                   from '@angular/common/http';
import { ResultBean }                                    from '@/app/common/result.bean';
import { HttpCollections }                               from '@/environments/environment';


// tree node数据结构
export class MenuTreeNode {
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
export class AreaFlatNodeDataSource implements DataSource<MenuTreeNode> {

    dataChange = new BehaviorSubject<MenuTreeNode[]>([]);

    get data(): MenuTreeNode[] {
        return this.dataChange.value;
    }

    set data(value: MenuTreeNode[]) {
        // this._treeControl.dataNodes = value;
        this.dataChange.next(value);
    }

    constructor(private _treeControl: FlatTreeControl<MenuTreeNode>,
                private httpClient: HttpClient) {
    }

    // 初始化数据
    initialData(): AreaFlatNodeDataSource {
        // this._treeControl.dataNodes = [new AreaFlatNode("0", null, "0", "区域", 1, true, false)];
        // this.data = this._treeControl.dataNodes;
        this.data = [new MenuTreeNode("0", null, "0", "区域", 1, true, false)];
        return this;
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        this._treeControl.expansionModel.changed.subscribe(change => {
            if (
                (change as SelectionChange<MenuTreeNode>).added ||
                (change as SelectionChange<MenuTreeNode>).removed
            ) {
                this.handleTreeControl(change as SelectionChange<MenuTreeNode>);
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
    handleTreeControl(change: SelectionChange<MenuTreeNode>) {
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

    toggleNode(node: MenuTreeNode, expand: boolean) {
        const index = this.data.indexOf(node);
        if (expand) {
            this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/area/get', {params: {areaParentCode: node.areaCode}})
                .subscribe((response) => {
                    let areas = response.data as any[];
                    if (areas.length === 0) {
                        node.expandable = false;
                        this.data[index] = new MenuTreeNode(node.areaCode, node.areaParentCode, node.expandCode, node.areaName, node.level, false);
                    } else {
                        areas = areas.map((area) => new MenuTreeNode(area.areaCode, area.areaParentCode, area.expandCode, area.areaName, node.level + 1));
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
  selector: 'app-menu-tree',
  templateUrl: './menu-tree.component.html',
  styleUrls: ['./menu-tree.component.scss']
})
export class MenuTreeComponent {

}
