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
        return this.reuseTabService.retrieve(route);
        // return null;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.reuseTabService.shouldAttach(route);
        // return false;
    }

    /**
     * 是否允许复用路由
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        return this.reuseTabService.shouldDetach(route);
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return this.reuseTabService.shouldReuseRoute(future, curr);
        // return future.routeConfig === curr.routeConfig;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        this.reuseTabService.store(route, handle);
    }

}
