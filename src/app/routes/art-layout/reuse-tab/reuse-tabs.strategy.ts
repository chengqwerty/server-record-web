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
        console.log("==================retrieve");
        const a = this.reuseTabService.retrieve(route);
        console.log("==================retrieve" + a);
        return a;
    }

    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        console.log(route.url + "==================shouldAttach");
        const a = this.reuseTabService.shouldAttach(route);
        console.log(route.url + "==================shouldAttach" + a);
        return a;
    }

    /**
     * 是否允许复用路由
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        console.log("==================shouldDetach");
        const a = this.reuseTabService.shouldDetach(route);
        console.log("==================shouldDetach" + a);
        return a;
    }

    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        console.log("==================shouldReuseRoute");
        const a = this.reuseTabService.shouldReuseRoute(future, curr);
        console.log("==================shouldReuseRoute" + a);
        return a;
    }

    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
        console.log("==================store");
        this.reuseTabService.store(route, handle);
    }

}
