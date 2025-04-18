import { Injectable }            from '@angular/core';
import { BehaviorSubject }       from 'rxjs';
import { AppSettings, defaults } from '@/app/core/setting';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private configSubject = new BehaviorSubject<AppSettings>(defaults);

    constructor() {
    }

    get config(): BehaviorSubject<AppSettings> {
        return this.configSubject;
    }

    set config(config: AppSettings) {
        this.configSubject.next(config);
    }
}
