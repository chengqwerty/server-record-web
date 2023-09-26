import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CollectionViewer, DataSource }                       from '@angular/cdk/collections';
import { BehaviorSubject, Observable }                        from 'rxjs';
import { HttpClient }                                         from '@angular/common/http';
import { ResultBean }                                         from '@/app/common/result.bean';
import { HttpCollections }                                    from '@/environments/environment';
import { FormBuilder }                                        from '@angular/forms';
import { MatDialog }                                          from '@angular/material/dialog';
import { MenuTreeComponent, MenuTreeNode }                    from '@/app/routes/system/menu/menu-tree/menu-tree.component';
import { MenuDialogComponent }                                from '@/app/routes/system/menu/menu-dialog/menu-dialog.component';
import { Model }                                              from '@/app/common/model';
import { ArtDialogService }                                   from '@think-make/art-extends/art-dialog';

export interface SysMenu {
    menuId: string,
    menuCode: string,
    menuName: string,
    menuDescription: string | null,
    menuType: number,
    menuIcon: string | null,
    menuLink: string | null
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
export class MenuComponent implements OnInit {

    // @ts-ignore
    @ViewChild(MenuTreeComponent, {static: true})
    private menuTreeComponent: MenuTreeComponent = {} as MenuTreeComponent;

    public menuTreeNode: MenuTreeNode | null = null;
    public dataSource: SysMenuDataSource;
    public displayedColumns = ['menuCode', 'menuName', 'menuDescription', 'action'];

    constructor(private formBuilder: FormBuilder,
                private matDialog: MatDialog,
                private httpClient: HttpClient,
                private artDialogService: ArtDialogService) {
        this.dataSource = new SysMenuDataSource(httpClient);
    }

    ngOnInit() {
        this.artDialogService.alert('success', 'The artDialogService is success!');
    }

    changeSelectedNode(menu: MenuTreeNode) {
        this.menuTreeNode = menu;
        this.dataSource.changeData(this.menuTreeNode.menuId);
    }

    addMenu() {
        if (this.menuTreeNode == null) {
            this.artDialogService.warning('请必须先选择一个菜单！');
            return;
        }
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            data: {
                model: Model.Create,
                parent: {
                    menuId: this.menuTreeNode?.menuId,
                    menuCode: this.menuTreeNode?.menuCode,
                    menuName: this.menuTreeNode?.menuName
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (this.menuTreeNode != null) {
                this.dataSource.changeData(this.menuTreeNode.menuId);
                this.menuTreeComponent.expand(this.menuTreeNode);
            }
        });
    }

    viewMenu(viewMenu: SysMenu) {
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            data: {
                model: Model.Read,
                parent: {
                    menuId: this.menuTreeNode?.menuId,
                    menuCode: this.menuTreeNode?.menuCode,
                    menuName: this.menuTreeNode?.menuName
                },
                record: {
                    ...viewMenu
                }
            }
        });
    }

    updateMenu() {

    }

    public assertMenuType(item: SysMenu): SysMenu {
        return item;
    }
}
