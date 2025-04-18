import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { ReuseTabService }                                                 from './reuse-tabs.service';
import { Injectable }                                                      from '@angular/core';

/**
 * 配合 ReuseTabComponent 实现路由复用
 */
@Injectable({
    providedIn: 'root'
})
export class ReuseTabStrategy implements RouteReuseStrategy {

    constructor(private reuseTabService: ReuseTabService) {
    }

    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        const a = this.reuseTabService.retrieve(route);
        // console.log(route.url + "==================retrieve" + a);
        return a;
    }

    /**
     * 是否允许还原路由，如果我们之前保存过这个路由的缓存，那么可以还原
     * @param route 要尝试还原的路由
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        const a = this.reuseTabService.shouldAttach(route);
        // console.log(route.url + "==================shouldAttach is " + a);
        return a;
    }

    /**
     * 是否允许复用路由
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        const a = this.reuseTabService.shouldDetach(route);
        // console.log(route.url + "==================shouldDetach is " + a);
        return a;
    }

    /**
     * 判断路由是否可以复用
     * @param future 将要跳转的路由
     * @param curr 当前路由
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        const a = this.reuseTabService.shouldReuseRoute(future, curr);
        // console.log(future.url + "==================shouldReuseRoute is " + a);
        return a;
    }

    /**
     * 如果一个将要离开的路由执行shouldDetach返回true，那么这个路由就需要保存。
     * 只有保存之后下次复用才可以获取。
     * @param route
     * @param handle
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        // console.log(route.url + "==================store");
        this.reuseTabService.store(route, handle);
    }

}
