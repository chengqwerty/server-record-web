import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource }               from '@angular/cdk/collections';
import { BehaviorSubject, Observable }  from 'rxjs';
import { HttpClient }                   from '@angular/common/http';
import { ResultBean }                   from '@/app/common/result.bean';
import { HttpCollections }              from '@/environments/environment';
import { FormBuilder }                  from '@angular/forms';
import { MatDialog }                    from '@angular/material/dialog';
import { AreaFlatNode }                    from '@/app/routes/system/area/area-tree/area-tree.component';
import { MenuTreeComponent, MenuTreeNode } from '@/app/routes/system/menu/menu-tree/menu-tree.component';
import { AreaDialogComponent }             from '@/app/routes/system/area/area-dialog/area-dialog.component';
import { MenuDialogComponent }             from '@/app/routes/system/menu/menu-dialog/menu-dialog.component';
import { DialogService }                              from '@/app/extensions/dialog/dialog.service';

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

    // @ts-ignore
    @ViewChild(MenuTreeComponent, {static: true})
    private menuTreeComponent: MenuTreeComponent = {} as MenuTreeComponent;

    public menuTreeNode: MenuTreeNode | null = null;
    public dataSource: SysMenuDataSource;
    public displayedColumns = ['menuCode', 'menuName', 'menuDescription'];

    constructor(private formBuilder: FormBuilder,
                private matDialog: MatDialog,
                private httpClient: HttpClient,
                private dialogService: DialogService) {
        this.dataSource = new SysMenuDataSource(httpClient);
    }

    changeSelectedNode(menu: MenuTreeNode) {
        this.menuTreeNode = menu;
        this.dataSource.changeData(this.menuTreeNode.menuId);
    }

    openDialog() {
        if (this.menuTreeNode == null) {
            this.dialogService.alert('warning', '请必须先选择一个菜单！');
            return;
        }
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            width: '480px',
            data: {
                menuId: this.menuTreeNode?.menuId,
                menuCode: this.menuTreeNode?.menuCode,
                menuName: this.menuTreeNode?.menuName
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (this.menuTreeNode != null) {
                this.dataSource.changeData(this.menuTreeNode.menuId);
                this.menuTreeComponent.expand(this.menuTreeNode);
            }
        });
    }

    public assertMenuType(item: SysMenu): SysMenu {
        return item;
    }
}
