import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpCollections } from '@/environments/environment';
import { ResultBean } from '@/app/common/result.bean';
import { SysMenu } from '@/app/routes/system/menu/menu.component';
import { AppConfigService } from '@/app/core/service/app-config.service';

export interface Menu {
    id: string;
    name: string;
    description?: string | null;
    target?: string | null;
    icon?: string | null;
    link?: string | null;
    closable?: boolean,
    type: 'group' | 'menu';
    level: number;
    opened?: boolean;
    parentId: string;
    children?: Menu[];
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menusSubject = new BehaviorSubject<Menu[] | null>(null);
    private secondMenusSubject = new BehaviorSubject<Menu[] | null>(null);

    constructor(private httpClient: HttpClient, private appConfigService: AppConfigService) {
    }

    refreshMenus() {
        this.httpClient.get<ResultBean>(HttpCollections.sysUrl + '/sys/menu/getUserMenus')
            .subscribe((response) => {
                if (response.code === 200) {
                    this.menusSubject.next(this.generateMenus(response.data as SysMenu[]));
                } else {
                    console.log('获取菜单失败!');
                }
            });
    }

    getMenus(): BehaviorSubject<Menu[] | null> {
        return this.menusSubject;
    }

    getSecondMenus(): BehaviorSubject<Menu[] | null> {
        return this.secondMenusSubject;
    }

    setSecondMenus(menus: Menu[]) {
        this.secondMenusSubject.next(menus);
    }

    generateMenus(menuList: SysMenu[]) {
        const menuMap = new Map<string, Menu>();
        const rootMenus: Menu[] = [];

        // 首先将所有菜单存入 Map 中
        menuList.forEach(menu => {
            menuMap.set(menu.menuId, {
                id: menu.menuId,
                name: menu.menuName,
                description: menu.menuDescription,
                target: '',
                icon: menu.menuIcon,
                link: menu.menuLink,
                closable: true,
                type: menu.menuType === 1 ? 'group' : 'menu',
                level: menu.menuLevel,
                parentId: menu.parentId,
                children: []
            });
        });

        // 构建菜单树
        menuList.forEach(menu => {
            if (menu.parentId === '0') {
                rootMenus.push(menuMap.get(menu.menuId)!);
            } else {
                const parentMenu = menuMap.get(menu.parentId!);
                if (parentMenu) {
                    parentMenu.children?.push(menuMap.get(menu.menuId)!);
                }
            }
        });

        return rootMenus;
    }

}
