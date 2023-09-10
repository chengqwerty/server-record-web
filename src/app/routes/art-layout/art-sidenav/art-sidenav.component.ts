import { Component } from '@angular/core';
import { Menu, MenuService } from "@/app/core/service/menu.service";

@Component({
    selector: 'app-art-sidenav',
    templateUrl: './art-sidenav.component.html',
    styleUrls: ['./art-sidenav.component.scss']
})
export class ArtSidenavComponent {
    public menus: Menu[];

    constructor(menuService: MenuService) {
        this.menus = menuService.getMenus();
    }

    ngOnInit() {
    }
}
