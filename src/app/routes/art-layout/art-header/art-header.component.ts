import { Component, OnInit }      from '@angular/core';
import { MatIconModule }          from '@angular/material/icon';
import { MatToolbarModule }       from '@angular/material/toolbar';
import { ExtensionsModule }       from '@/app/extensions/extensions.module';
import { Menu, MenuService }      from '@/app/core/service/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule }           from '@angular/common';
import { MatRippleModule }        from '@angular/material/core';
import { MatButtonModule }        from '@angular/material/button';
import { ArtHeaderUserComponent } from '@/app/routes/art-layout/art-header/art-header-user/art-header-user.component';

@Component({
    selector: 'app-art-header',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        ExtensionsModule,
        MatRippleModule,
        ArtHeaderUserComponent,
    ],
    templateUrl: './art-header.component.html',
    styleUrls: ['./art-header.component.scss']
})
export class ArtHeaderComponent implements OnInit {

    public menus: Menu[] = [];

    constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
        this.menuService.getMenus().subscribe((menus) => {
            this.menus = menus == null ? [] : menus;
            console.log('art header menus', this.menus);
        });
    }

    ngOnInit(): void {
    }

    goToSidenav(menu: Menu) {
        if (menu.children != null) {
            this.menuService.setSecondMenus(menu.children);
        } else {
            this.menuService.setSecondMenus([]);
        }
    }

}
