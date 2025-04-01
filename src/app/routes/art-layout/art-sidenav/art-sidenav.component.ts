import { Component }                             from '@angular/core';
import { Menu, MenuService }                     from '@/app/core/service/menu.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule }                          from '@angular/common';
import { MatIcon }                                    from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
        // trigger('openClose', [
        //     state('open', style({
        //         backgroundColor: 'red',
        //     })),
        //     state('closed', style({
        //         backgroundColor: 'blue',
        //     })),
        //     transition('open => closed', [animate('1s')]),
        // ])
    ],
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
