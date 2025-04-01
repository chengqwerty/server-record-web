import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig }                                                              from '@angular/core';
import { DefaultInterceptor }                                                             from '@/app/core/net/default.interceptor';
import { provideRouter, RouteReuseStrategy }                                              from '@angular/router';
import { routes }                                                                         from '@/app/app.routes';
import {
    ReuseTabStrategy
}                                                                                         from '@/app/routes/art-layout/reuse-tab/reuse-tabs.strategy';
import { provideAnimationsAsync }                                                         from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            // DI-based interceptors must be explicitly enabled.
            withInterceptorsFromDi(),
        ),
        provideRouter(routes),
        provideAnimationsAsync(),
        {provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true},
        {provide: RouteReuseStrategy, useClass: ReuseTabStrategy}
    ]
};
