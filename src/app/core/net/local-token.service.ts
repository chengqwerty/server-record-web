import { Inject, inject, Injectable, OnDestroy } from '@angular/core';
import { StoreService, TOKEN_STORE_SERVICE }     from '@/app/core/store/store-dynamic.interface';
import { TokenModel, TokenService }        from '@/app/core/net/token-dynamic.interface';

export function TOKEN_SERVICE_FACTORY(): LocalTokenService {
    return new LocalTokenService(inject(TOKEN_STORE_SERVICE));
}

const USER_TOKEN_KEY = 'art-user-token';

@Injectable()
export class LocalTokenService implements TokenService, OnDestroy {

    constructor(@Inject(TOKEN_STORE_SERVICE) private storeService: StoreService) {
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

    getTokenDetail(): TokenModel {
        return (this.storeService.get(USER_TOKEN_KEY) as TokenModel);
    }

    clear() {
        this.storeService.remove(USER_TOKEN_KEY);
    }

}
