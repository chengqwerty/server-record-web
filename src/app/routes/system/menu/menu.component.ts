import { Component, EventEmitter, Output } from '@angular/core';
import { CollectionViewer, DataSource }    from '@angular/cdk/collections';
import { BehaviorSubject, Observable }  from 'rxjs';
import { HttpClient }                   from '@angular/common/http';
import { ResultBean }                   from '@/app/common/result.bean';
import { HttpCollections }              from '@/environments/environment';
import { FormBuilder }                  from '@angular/forms';
import { MatDialog }                    from '@angular/material/dialog';
import { AreaFlatNode }                 from '@/app/routes/system/area/area-tree/area-tree.component';
import { MenuTreeNode }                 from '@/app/routes/system/menu/menu-tree/menu-tree.component';

export interface SysMenu {
    menuId: string,
    menuCode: string,
    menuName: string,
    menuDescription: string | null,
    menuType: number
}

export class SysMenuDataSource implements DataSource<SysMenu> {

    private menuSubject = new BehaviorSubject<SysMenu[]>([]);

    constructor(private httpClient: HttpClient) {

    }

    connect(collectionViewer: CollectionViewer): Observable<SysMenu[]> {
        return this.menuSubject;
    }

    disconnect(collectionViewer: CollectionViewer): void {
    }

    changeData(menuId: string) {
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/menu/getListByParent', {params: {parentId: menuId}})
            .subscribe((response) => {
                this.menuSubject.next(response.data as SysMenu[]);
            });
    }

}

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

    public selectedMenuId: string | null = null;
    public dataSource: SysMenuDataSource;
    public displayedColumns = ['menuCode', 'menuName', 'menuDescription'];

    constructor(private formBuilder: FormBuilder,
                private dialog: MatDialog,
                private httpClient: HttpClient) {
        this.dataSource = new SysMenuDataSource(httpClient);
    }

    changeSelectedNode(menuId: string) {
        this.selectedMenuId = menuId;
        this.dataSource.changeData(this.selectedMenuId);
    }

    openDialog() {

    }

    public assertMenuType(item: SysMenu): SysMenu {
        return item;
    }
}
