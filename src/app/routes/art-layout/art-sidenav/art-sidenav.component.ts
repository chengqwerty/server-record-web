import { Component }                             from '@angular/core';
import { Menu, MenuService }                     from '@/app/core/service/menu.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule }                          from '@angular/common';
import { MatIcon }                               from '@angular/material/icon';

@Component({
    selector: 'app-art-sidenav',
    standalone: true,
    templateUrl: './art-sidenav.component.html',
    imports: [
        MatIcon,
        CommonModule
    ],
    styleUrls: ['./art-sidenav.component.scss']
})
export class ArtSidenavComponent {
    public menus: Menu[];
    public currentUrl: string = '';

    constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute) {
        this.menus = menuService.getMenus();
        console.log(this.menus);
        // route.url.subscribe((url) => {
        //     console.log(url);
        // });
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.currentUrl = (event as NavigationEnd).url;
            }
        });
    }

    ngOnInit() {
    }

    navigate(link: string) {
        this.router.navigateByUrl(link);
    }
}
