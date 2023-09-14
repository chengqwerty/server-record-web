import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface Menu {
    name: string;
    description?: string;
    target?: string;
    icon?: string;
    link?: string;
    closable?: boolean,
    type?: 'group' | 'menu';
    opened?: boolean;
    children?: Menu[];
}

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private menuSub = new BehaviorSubject<boolean>(true);

    private menus: Menu[] = [
        {
            name: '系统管理',
            icon: 'settings',
            opened: true,
            type: 'group',
            children: [
                {
                    name: '区域管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/area'
                },
                {
                    name: '部门管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/depart'
                },
                {
                    name: '菜单管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/menu'
                }

            ]
        }
    ];

    getMenus(): Menu[] {
        return this.menus;
    }

    setMenus(menus: Menu[]) {
        this.menus = menus;
        this.menuSub.next(true);
    }
}
