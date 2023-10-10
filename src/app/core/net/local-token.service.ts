import { Inject, inject, Injectable, OnDestroy } from '@angular/core';
import { STORE_SERVICE_TOKEN, StoreService }     from '@/app/core/store/store-dynamic.interface';
import { TokenModel, TokenService }              from '@/app/core/net/token-dynamic.interface';

export function TOKEN_SERVICE_FACTORY(): LocalTokenService {
    return new LocalTokenService(inject(STORE_SERVICE_TOKEN));
}

const USER_TOKEN_KEY = 'art-user-token';

@Injectable()
export class LocalTokenService implements TokenService, OnDestroy {

    constructor(
        @Inject(STORE_SERVICE_TOKEN) private storeService: StoreService
    ) {
    }

    ngOnDestroy(): void {
    }

    getRefreshToken(): string {
        return (this.storeService.get(USER_TOKEN_KEY) as TokenModel).refreshToken;
    }

    getToken(): string {
        return (this.storeService.get(USER_TOKEN_KEY) as TokenModel).token;
    }

    setTokenModel(tokenModel: TokenModel): void {
        this.storeService.set(USER_TOKEN_KEY, tokenModel);
    }

}
