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
            name: '控制面板',
            icon: 'set',
            opened: true,
            children: [
                {
                    name: '颜色',
                    icon: 'set',
                    opened: true,
                    type: 'group',
                    children: [
                        {
                            name: 'area',
                            icon: 'set',
                            closable: true,
                            link: 'sys/area'
                        },
                        {
                            name: 'depart',
                            icon: 'set',
                            link: 'sys/depart'
                        }
                    ]
                },

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
