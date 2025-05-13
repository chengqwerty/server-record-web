import { InjectionToken }                           from '@angular/core';
import { TOKEN_SERVICE_FACTORY, LocalTokenService } from '@/app/core/net/local-token.service';
import { User }                                     from '@/app/core/service/user.service';

export const USER_TOKEN_SERVICE = new InjectionToken<TokenService>('USER_TOKEN_SERVICE', {
    providedIn: 'root',
    factory: TOKEN_SERVICE_FACTORY
});

export interface TokenModel {
    token: string;
    refreshToken: string;
    user: User;
    roles: string[];
    authorities: string[];
    issueTime: Date
}

export interface TokenService {

    setTokenModel(tokenModel: TokenModel): void;

    getRefreshToken(): string;

    getToken(): string;

    getTokenDetail(): TokenModel;

    clear(): void;

}
