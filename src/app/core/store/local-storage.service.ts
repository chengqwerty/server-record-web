import { Injectable }   from '@angular/core';
import { StoreService } from '@/app/core/store/store-dynamic.interface';

export function STORE_SERVICE_FACTORY(): StoreService {
    return new LocalStorageService();
}

@Injectable()
export class LocalStorageService implements StoreService {

    get(key: string): object {
        return JSON.parse(localStorage.getItem(key) || '{}') || {};
    }

    set(key: string, value: string | object | Array<any>): boolean {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
    }

}
