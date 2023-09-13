import { Injectable, Injector, OnDestroy }             from '@angular/core';
import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    NavigationEnd,
    NavigationStart,
    Router,
    ROUTER_CONFIGURATION,
    ExtraOptions
}                                                      from '@angular/router';
import {
    ReuseComponentRef,
    ReuseTabCached,
    ReuseTabNotify,
    ReuseTabRouteParamMatchMode,
    ReuseTitle
}                                                      from './reuse-tabs.interfaces';
import { BehaviorSubject, Observable, Unsubscribable } from 'rxjs';

class NzSafeAny {
}

@Injectable({providedIn: 'root'})
export class ReuseTabService implements OnDestroy {

    // 路由复用匹配模式
    private routeParamMatchMode: ReuseTabRouteParamMatchMode = 'strict';

    private _keepingScroll = false;

    // 滚动条容器
    private keepingScrollContainer: Element | undefined;

    private _router$: Unsubscribable | undefined;

    // 路由数据缓存
    private _cached: ReuseTabCached[] = [];

    // 路由复用数据变更通知
    private _cachedChange = new BehaviorSubject<ReuseTabNotify | null>(null);

    /**
     * 在删除一个tab标签时要触发路由变动，此时会触发路由复用store操作，那么刚刚删除的tab标签会重新add.
     * removeUrlBuffer负责记录这个删除的tab标签的url，在下次添加前不在把它add进cache中。
     * @private
     */
    private removeUrlBuffer: string | null | undefined;

    private _max = 10;

    private _closableCached: { [url: string]: boolean } = {};

    componentRef: ReuseComponentRef | undefined;

    // 缓存的路由title
    private _titleCached: { [url: string]: ReuseTitle } = {};
    private positionBuffer: { [url: string]: [number, number] } = {};

    private debug = false;

    /** 排除规则，限 `mode=URL` */
    private excludes: RegExp[] = [];

    constructor(private injector: Injector) {

    }

    // 当前路由地址
    get curUrl(): string {
        return this.getUrl(this.snapshot);
    }

    set keepingScroll(value: boolean) {
        this._keepingScroll = value;
        this.initScroll();
    }

    get keepingScroll(): boolean {
        return this._keepingScroll;
    }

    // 获取路由快照
    private get snapshot(): ActivatedRouteSnapshot {
        return this.injector.get(ActivatedRoute).snapshot;
    }

    // 获取当前缓存的路由总数
    get count(): number {
        return this._cached.length;
    }

    // 获取已缓存的路由
    get items(): ReuseTabCached[] {
        return this._cached;
    }

    // 订阅缓存变更通知
    get change(): Observable<ReuseTabNotify | null> {
        return this._cachedChange.asObservable(); // .pipe(filter(w => w !== null));
    }

    /**
     * 保证每次都从最后的子路由开始获取,你去测试就会发现,
     * 两懒加载模块间跳转时，进入的ActivatedRouteSnapshot是中间的路由配置，需要找回最后的child
     * @param route 快照
     */
    getTruthRoute(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
        let next = route;
        while (next.firstChild) {
            next = next.firstChild;
        }
        return next;
    }

    /**
     * 根据快照获取url地址，isComplete 决定是否获取完整的url路径
     * 因为在判断是否需要复用时只判断当前url的route是否需要复用就行
     * 在存储时需要存储完整的url路径
     * 完整的url需要找到最终的route然后自己拼接
     * @param route 快照
     * @param isComplete 是否获取完整的url路径
     */
    getUrl(route: ActivatedRouteSnapshot, isComplete = true): string {
        // 这里先屏蔽，感觉没有必要找到最后的route在计算url
        let next: ActivatedRouteSnapshot;
        if (isComplete) {
            next = this.getTruthRoute(route);
        } else {
            next = route;
        }
        const segments: string[] = [];
        while (next) {
            segments.push(next.url.join('/'));
            // tslint:disable-next-line:no-non-null-assertion
            next = next.parent!;
        }
        const url =
            '/' +
            segments
                .filter(i => i)
                .reverse()
                .join('/');
        return url;
    }

    /**
     * 判断路由是否有效
     * ---盲猜如果是中间路由不复用---
     * @param route 快照
     * @private
     */
    private hasInValidRoute(route: ActivatedRouteSnapshot): boolean {
        return !route.routeConfig || !!route.routeConfig.loadChildren || !!route.routeConfig.children;
    }

    // 测试使用
    private di(...args: NzSafeAny[]): void {
        if (!this.debug) {
            return;
        }
        // tslint:disable-next-line:no-console
        console.warn(...args);
    }

    /**
     * 根据排除规则限定是否排除该路由
     * @param url 路由的url
     */
    isExclude(url: string): boolean {
        return this.excludes.findIndex(r => r.test(url)) !== -1;
    }

    /**
     * 决定路由数据是否需要分离保存
     * @param route 快照
     */
    can(route: ActivatedRouteSnapshot): boolean {
        const url = this.getUrl(route);
        if (url === this.removeUrlBuffer) {
            return false;
        }

        if (route.data && typeof route.data['reuse'] === 'boolean') {
            return route.data['reuse'];
        }

        // if (this.mode !== ReuseTabMatchMode.URL) {
        //   const menu = this.getMenu(url);
        //   if (!menu) return false;
        //   if (this.mode === ReuseTabMatchMode.Menu) {
        //     if (menu.reuse === false) return false;
        //   } else {
        //     if (!menu.reuse || menu.reuse !== true) return false;
        //   }
        //   return true;
        // }
        return !this.isExclude(url);
    }

    /**
     * 取指定路径缓存所在位置，`-1` 表示无缓存
     * @param url
     */
    index(url: string): number {
        return this._cached.findIndex(w => w.url === url);
    }

    getTitle(url: string, route?: ActivatedRouteSnapshot): ReuseTitle {
        if (this._titleCached[url]) {
            return this._titleCached[url];
        }

        if (route && route.data && (route.data['titleI18n'] || route.data['title'])) {
            return {
                text: route.data['title'],
                i18n: route.data['titleI18n'],
            } as ReuseTitle;
        }

        // const menu = this.getMenu(url);
        // return menu ? { text: menu.text, i18n: menu.i18n } : { text: url };
        return {
            text: url
        };
    }

    getClosable(url: string, route?: ActivatedRouteSnapshot): boolean {
        if (typeof this._closableCached[url] !== 'undefined') {
            return this._closableCached[url];
        }

        if (route && route.data && typeof route.data['reuseClosable'] === 'boolean') {
            return route.data['reuseClosable'];
        }

        // const menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
        // if (menu && typeof menu.reuseClosable === 'boolean') return menu.reuseClosable;

        return true;
    }

    getKeepingScroll(url: string, route?: ActivatedRouteSnapshot): boolean {
        if (route && route.data && typeof route.data['keepingScroll'] === 'boolean') {
            return route.data['keepingScroll'];
        }

        // const menu = this.mode !== ReuseTabMatchMode.URL ? this.getMenu(url) : null;
        // if (menu && typeof menu.keepingScroll === 'boolean') return menu.keepingScroll;

        return this.keepingScroll;
    }

    // private get ss(): ScrollService {
    //   return this.injector.get(ScrollService);
    // }

    private get ss(): any {
        return null;
    }

    private get isDisabledInRouter(): boolean {
        const routerConfig = this.injector.get<ExtraOptions>(ROUTER_CONFIGURATION, {} as any);
        return routerConfig.scrollPositionRestoration === 'disabled';
    }

    /** 获取指定路径缓存 */
    get(url?: string): ReuseTabCached | null {
        return url ? this._cached.find(w => w.url === url) || null : null;
    }

    /**
     * 初始化滚动条
     * 功能有待研究，比较复杂
     * @private
     */
    private initScroll(): void {
        if (this._router$) {
            this._router$.unsubscribe();
        }

        this._router$ = this.injector.get<Router>(Router).events.subscribe(e => {
            if (e instanceof NavigationStart) {
                const url = this.curUrl;
                if (this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
                    this.positionBuffer[url] = this.ss.getScrollPosition(this.keepingScrollContainer);
                } else {
                    delete this.positionBuffer[url];
                }
            } else if (e instanceof NavigationEnd) {
                const url = this.curUrl;
                const item = this.get(url);
                if (item && item.position && this.getKeepingScroll(url, this.getTruthRoute(this.snapshot))) {
                    if (this.isDisabledInRouter) {
                        this.ss.scrollToPosition(this.keepingScrollContainer, item.position);
                    } else {
                        // tslint:disable-next-line:no-non-null-assertion
                        setTimeout(() => this.ss.scrollToPosition(this.keepingScrollContainer, item.position!), 1);
                    }
                }
            }
        });
    }

    /**
     * 删除一个已经缓存的路由快照
     * @param url 要删除的路由快照url
     * @param includeNonCloseable false 不强制删除，true 强制删除不管路由是否配置可否关闭
     * @private
     */
    private remove(url: string | number, includeNonCloseable: boolean): boolean {
        const idx = typeof url === 'string' ? this.index(url) : url;
        const item = idx !== -1 ? this._cached[idx] : null;
        if (!item || (!includeNonCloseable && !item.closable)) {
            return false;
        }

        this.destroy(item._handle);

        this._cached.splice(idx, 1);
        delete this._titleCached[url];
        return true;
    }

    private destroy(_handle: any): void {
        if (_handle && _handle.componentRef && _handle.componentRef.destroy) {
            _handle.componentRef.destroy();
        }
    }

    close(url: string, includeNonCloseable: boolean): boolean {
        this.removeUrlBuffer = url;
        this.remove(url, includeNonCloseable);
        this._cachedChange.next({active: 'close', url, list: this._cached});
        return true;
    }

    // 路由复用钩子
    // runHook(method: ReuseHookTypes, comp: ReuseComponentRef | number, type: ReuseHookOnReuseInitType = 'init'): void {
    //   if (typeof comp === 'number') {
    //     const item = this._cached[comp];
    //     comp = item._handle.componentRef;
    //   }
    //   const compThis = comp.instance;
    //   if (comp == null || !compThis) {
    //     return;
    //   }
    //   const fn = compThis[method];
    //   if (typeof fn !== 'function') {
    //     return;
    //   }
    //   if (method === '_onReuseInit') {
    //     fn.call(compThis, type);
    //   } else {
    //     (fn as () => void).call(compThis);
    //   }
    // }

    /**
     * Detach 分离，决定路由数据是否需要分离保存
     * @param route 快照
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.hasInValidRoute(route)) {
            return false;
        }
        this.di('#shouldDetach', this.can(route), this.getUrl(route));
        return this.can(route);
    }

    /**
     * 存储复用的路由
     * @param _snapshot 快照
     * @param _handle 缓存数据
     */
    // tslint:disable-next-line:variable-name
    store(_snapshot: ActivatedRouteSnapshot, _handle: any): void {
        const url = this.getUrl(_snapshot);
        const idx = this.index(url);
        const isAdd = idx === -1;

        const item: ReuseTabCached = {
            title: this.getTitle(url, _snapshot),
            closable: this.getClosable(url, _snapshot),
            position: this.getKeepingScroll(url, _snapshot) ? this.positionBuffer[url] : null,
            url,
            _snapshot,
            _handle,
        };
        if (isAdd) {
            if (this.count >= this._max) {
                // Get the oldest closable location, 这里第一个就是最老的
                // tslint:disable-next-line:no-non-null-assertion
                const closeIdx = this._cached.findIndex(w => w.closable!);
                if (closeIdx !== -1) {
                    this.remove(closeIdx, false);
                }
            }
            this._cached.push(item);
        } else {
            this._cached[idx] = item;
        }
        this.removeUrlBuffer = null;

        this.di('#store', isAdd ? '[new]' : '[override]', url);

        if (_handle && _handle.componentRef) {
            // this.runHook('_onReuseDestroy', _handle.componentRef);
        }

        if (isAdd) {
            // 这里不触发add事件，在shouldAttach方法中触发
            // this._cachedChange.next({ active: 'add', url, list: this._cached });
        } else {
            this._cachedChange.next({active: 'override', item, list: this._cached});
        }
    }

    /**
     * 决定是否允许获取已缓存数据
     * @param route
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        if (this.hasInValidRoute(route)) {
            return false;
        }
        const url = this.getUrl(route);
        const data = this.get(url);
        const ret = !!(data && data._handle);
        this.di('#shouldAttach', ret, url);
        if (ret) {
            // tslint:disable-next-line:no-non-null-assertion
            const compRef = data!._handle.componentRef;
            if (compRef) {
                this.componentRef = compRef;
                // this.runHook('_onReuseInit', compRef);
            }
        } else { // 如果没有取到数据说明这个是新增的，触发add事件
            this._cachedChange.next({active: 'add', url, list: this._cached});
        }
        return ret;
    }

    // 提取复用数据
    retrieve(route: ActivatedRouteSnapshot): {} | null {
        if (this.hasInValidRoute(route)) {
            return null;
        }
        const url = this.getUrl(route);
        const data = this.get(url);
        const ret = (data && data._handle);
        // @ts-ignore
        this.di('#retrieve', url, ret);
        return ret;
    }

    /**
     * 判断路由是否可以复用
     * @param future 将要跳转的路由
     * @param curr 当前路由
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        let ret = future.routeConfig === curr.routeConfig;
        if (!ret) {
            return false;
        }
        const path = ((future.routeConfig && future.routeConfig.path) || '') as string;
        if (path.length > 0 && path.indexOf(':')) {
            if (this.routeParamMatchMode === 'strict') {
                ret = this.getUrl(future, false) === this.getUrl(curr, false);
            } else {
                ret = path === ((curr.routeConfig && curr.routeConfig.path) || '');
            }
        }
        return ret;
    }

    ngOnDestroy(): void {
        console.log('This is destroy function');
    }

}
