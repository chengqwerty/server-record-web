import { InjectionToken } from '@angular/core';
import { STORE_SERVICE_FACTORY } from '@/app/core/store/local-storage.service';

export const STORE_SERVICE_TOKEN = new InjectionToken<StoreService>('STORE_SERVICE_TOKEN', {
    providedIn: 'root',
    factory: STORE_SERVICE_FACTORY
});

export interface StoreService {

    get(key: string): object;

    set(key: string, value: string | object | Array<any> ): boolean;

    remove(key: string): void
}
