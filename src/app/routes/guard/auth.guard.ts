import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable }                                               from '@angular/core';
import { MenuService }                                                      from '@/app/core/service/menu.service';
import { USER_TOKEN_SERVICE }                                               from '@/app/core/net/token-dynamic.interface';
import { LocalTokenService }                                                from '@/app/core/net/local-token.service';
import { ArtDialogService }                                                 from '@think-make/art-extends/art-dialog';

/**
 * 用户登录路由守卫
 * 1、localStorage获取Auth-Token
 * 2、使用token获取用户菜单视图
 * 3、如果token过期返回登录界面
 * @param route
 * @param state
 */
@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(private menuService: MenuService,
                private router: Router,
                @Inject(USER_TOKEN_SERVICE) private tokenService: LocalTokenService,
                private artDialogService: ArtDialogService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.tokenService.getToken();
        if (!token) {
            this.artDialogService.error('请先登录!');
            return this.router.navigate(['/login']);
        } else if (this.menuService.getMenus().value == null) {
            this.menuService.refreshMenus();
        }
        return true;
    }

}
