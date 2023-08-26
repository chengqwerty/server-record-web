import { ActivatedRouteSnapshot } from '@angular/router';

// 路由复用匹配模式
export type ReuseTabRouteParamMatchMode = 'strict' | 'loose';

class ReuseComponentHandle {
    componentRef: ReuseComponentRef | undefined;
}

export interface ReuseComponentRef {
    instance: ReuseComponentInstance;
}

export interface ReuseComponentInstance {
    _onReuseInit: (type: ReuseHookOnReuseInitType) => void;
    _onReuseDestroy: () => void;
    destroy: () => void;
}

export type ReuseHookOnReuseInitType = 'init' | 'refresh';

export interface ReuseTitle {
    text: string;
    i18n?: string;
}

export interface ReuseTabNotify {
    /** 事件类型 */
    active: 'add' | 'override' | 'title' | 'clear' | 'closable' | 'close' | 'closeRight' | 'move' | 'refresh';
    url?: string;
    title?: ReuseTitle;
    item?: ReuseTabCached;
    list?: ReuseTabCached[];

    [key: string]: any;
}

export interface ReuseItem {
    url: string;
    title: string;
    closable: boolean;
    index: number;
    active: boolean;
    last: boolean;
}

export interface ReuseTabCached {
    title: ReuseTitle;

    url: string;

    /** 是否允许关闭，默认：`true` */
    closable?: boolean;

    /** 当前滚动条位置 */
    position?: [number, number] | null;

    _snapshot: ActivatedRouteSnapshot;

    _handle: ReuseComponentHandle;
}
