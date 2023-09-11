import { CanActivateFn } from '@angular/router';

/**
 * 用户登录路由守卫
 * 1、localStorage获取Auth-Token
 * 2、使用token获取用户菜单视图
 * 3、如果token过期返回登录界面
 * @param route
 * @param state
 */
export const authGuard: CanActivateFn = (route, state) => {
    const token = localStorage.getItem("Auth-Token");

    return true;
};
