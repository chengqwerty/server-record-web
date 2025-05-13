import { InjectionToken }        from '@angular/core';
import { STORE_SERVICE_FACTORY } from '@/app/core/store/local-storage.service';

export const TOKEN_STORE_SERVICE = new InjectionToken<StoreService>('TOKEN_STORE_SERVICE', {
    providedIn: 'root',
    factory: STORE_SERVICE_FACTORY
});

export interface StoreService {

    get(key: string): object;

    set(key: string, value: string | object | Array<any>): boolean;

    remove(key: string): void;

    clear(): void;

}
