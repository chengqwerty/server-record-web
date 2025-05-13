import { inject, Inject, InjectionToken } from '@angular/core';
import { TokenService, USER_TOKEN_SERVICE } from '@/app/core/net/token-dynamic.interface';

export interface User {
    id: string;
    nickname: string;
    name: string;
    email: string;
    avatar: string | null;
}

export const LOCAL_USER_SERVICE = new InjectionToken<UserService>('LOCAL_USER_SERVICE', {
    providedIn: 'root',
    factory: LOCAL_USER_SERVICE_FACTORY
});

export function LOCAL_USER_SERVICE_FACTORY(): UserService {
    return new UserService(inject(USER_TOKEN_SERVICE));
}

export class UserService {

    constructor(private tokenService: TokenService) {

    }

    get user(): User {
        return this.tokenService.getTokenDetail().user;
    }

}
