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
    menuLink: string | null,
    menuLevel: number,
    menuSort: number | null,
    menuVisible: number | null,
    parentId: string
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

    getData(): SysMenu[] {
        return this.menuSubject.value;
    }

}

@Component({
    selector: 'app-menu',
    standalone: false,
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    @ViewChild(MenuTreeComponent, {static: true})
    private menuTreeComponent!: MenuTreeComponent;

    public menuTreeNode: MenuTreeNode | null = null;
    public dataSource: SysMenuDataSource;
    public displayedColumns = ['menuCode', 'menuName', 'menuLink', 'menuVisible', 'menuDescription', 'action'];

    constructor(private formBuilder: FormBuilder,
                private matDialog: MatDialog,
                private httpClient: HttpClient,
                private artDialogService: ArtDialogService) {
        this.dataSource = new SysMenuDataSource(httpClient);
    }

    ngOnInit() {
    }

    changeSelectedNode(menu: MenuTreeNode) {
        this.menuTreeNode = menu;
        this.dataSource.changeData(this.menuTreeNode.menuId);
    }

    addMenu() {
        if (this.menuTreeNode == null) {
            this.artDialogService.warning('你必须先选择一个菜单！');
            return;
        }
        const data = this.dataSource.getData();
        let sort = 0;
        for (let i = 0; i < data.length; i++) {
            const current = (data[i].menuSort == null ? 0 : data[i].menuSort) as number;
            if (current > sort) {
                sort = current;
            }
        }
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            maxWidth: 1080,
            data: {
                model: Model.Create,
                parent: {
                    menuId: this.menuTreeNode?.menuId,
                    menuCode: this.menuTreeNode?.menuCode,
                    menuName: this.menuTreeNode?.menuName
                },
                record: {
                    menuSort: sort + 10
                }
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (this.menuTreeNode != null) {
                this.dataSource.changeData(this.menuTreeNode.menuId);
                this.menuTreeComponent.refreshExpand(this.menuTreeNode);
            }
        });
    }

    viewMenu(viewMenu: SysMenu) {
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            width: '1080px',
            maxWidth: 1080,
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

    updateMenu(viewMenu: SysMenu) {
        const dialogRef = this.matDialog.open(MenuDialogComponent, {
            maxWidth: 1080,
            data: {
                model: Model.Update,
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
        dialogRef.afterClosed().subscribe(result => {
            if (this.menuTreeNode != null) {
                this.dataSource.changeData(this.menuTreeNode.menuId);
                this.menuTreeComponent.refreshExpand(this.menuTreeNode);
            }
        });
    }

    deleteMenu(menu: SysMenu) {
        this.artDialogService.confirm('确定要删除吗？', '删除后无法恢复，请谨慎操作！').afterClosed().subscribe(result => {
            if (result) {
                this.httpClient.post<ResultBean>(HttpCollections.sysUrl + '/sys/menu/delete', {menuId: menu.menuId})
                    .subscribe((response: ResultBean) => {
                        if (response.code === 200) {
                            this.artDialogService.primary('删除成功！');
                            this.dataSource.changeData(this.menuTreeNode?.menuId ?? '');
                        }
                    });
            }
        });
    }

    public assertMenuType(item: SysMenu): SysMenu {
        return item;
    }
}
