import { Injectable }       from '@angular/core';
import { BehaviorSubject }  from 'rxjs';
import { HttpClient }       from '@angular/common/http';
import { HttpCollections }  from '@/environments/environment';
import { ResultBean }       from '@/app/common/result.bean';
import { SysMenu }          from '@/app/routes/system/menu/menu.component';
import { AppConfigService } from '@/app/core/service/app-config.service';
import arrayToTree          from '@/app/utils/arrayToTree';

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
                    let menus = arrayToTree(response.data as SysMenu[], '0', 'menuId', 'parentId', (menu: SysMenu): Menu & {
                        children: Menu[]
                    } => {
                        return {
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
                        }
                    });
                    this.menusSubject.next(menus);
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

}
