import { Component }                             from '@angular/core';
import { Menu, MenuService }                     from '@/app/core/service/menu.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule }                          from '@angular/common';
import { MatIcon }                                    from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { defaults } from '@/app/core/setting';
import { AppConfigService } from '@/app/core/service/app-config.service';

@Component({
    selector: 'app-art-sidenav',
    standalone: true,
    templateUrl: './art-sidenav.component.html',
    imports: [
        MatIcon,
        CommonModule
    ],
    styleUrls: ['./art-sidenav.component.scss'],
    animations:[
        trigger('openClose', [
            state('open', style({
                height: '*',
                overflow: 'hidden'
            })),
            state('closed', style({
                height: '0',
                overflow: 'hidden'
            })),
            transition('closed <=> open', [
                animate('0.4s ease-in-out')
            ]),
        ]),
    ],
})
export class ArtSidenavComponent {
    public menus: Menu[] | null = [];
    public currentUrl: string = '';

    constructor(private menuService: MenuService, private appConfigService: AppConfigService, private router: Router, private route: ActivatedRoute) {
        this.menuService.getSecondMenus().subscribe((menus) => {
            this.menus = menus;
            let value = this.appConfigService.config.value;
            if (menus == null && value.showSidenav) {
                value.showSidenav = false;
                this.appConfigService.config.next({...value});
            } else if (menus != null && !value.showSidenav) {
                value.showSidenav = true;
                this.appConfigService.config.next({...value});
            }
            console.log('art sidenav menus', this.menus);
        });
        // console.log(this.menus);
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

    menuExpand(menu: Menu) {
        menu.opened = !menu.opened;
    }

    expressionMenu(menu: Menu) {
        return menu.opened ? 'open' : 'closed';
    }

    menuPaddingLeft(menu: Menu) {
        return (menu.level + 1) * 8 + 'px';
    }

    navigate(link: string) {
        this.router.navigateByUrl(link);
    }
}
