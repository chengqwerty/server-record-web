import { InjectionToken }                           from '@angular/core';
import { TOKEN_SERVICE_FACTORY, LocalTokenService } from '@/app/core/net/local-token.service';

export const TOKEN_SERVICE_TOKEN = new InjectionToken<TokenService>('TOKEN_SERVICE_TOKEN', {
    providedIn: 'root',
    factory: TOKEN_SERVICE_FACTORY
});

export interface TokenModel {
    token: string;
    refreshToken: string;
    issueTime: Date
}

export interface TokenService {

    setTokenModel(tokenModel: TokenModel): void;

    getRefreshToken(): string;

    getToken(): string;

}
