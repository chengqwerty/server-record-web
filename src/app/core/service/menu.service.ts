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
    level: number;
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
            level: 1,
            children: [
                {
                    name: '区域管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/area',
                    level: 2,
                },
                {
                    name: '部门管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/depart',
                    level: 2,
                },
                {
                    name: '菜单管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/menu',
                    level: 2,
                },
                {
                    name: '动画管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/animation',
                    level: 2,
                }

            ]
        },
        {
            name: '系统管理',
            icon: 'settings',
            opened: true,
            type: 'group',
            level: 1,
            children: [
                {
                    name: '区域管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/area',
                    level: 2,
                },
                {
                    name: '部门管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/depart',
                    level: 2,
                },
                {
                    name: '菜单管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/menu',
                    level: 2,
                },
                {
                    name: '动画管理',
                    icon: 'settings',
                    opened: true,
                    type: 'menu',
                    link: '/bus/sys/animation',
                    level: 2,
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
