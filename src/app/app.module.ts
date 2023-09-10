import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }                     from './app.component';
import { BrowserAnimationsModule }          from '@angular/platform-browser/animations';
import { SharedModule }                     from './shared/shared.module';
import { ExtensionsModule }                 from './extensions/extensions.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { RoutesModule }                     from '@/app/routes/routes.module';
import { ReuseTabStrategy }                 from '@/app/routes/art-layout/reuse-tab/reuse-tabs.strategy';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedModule,
        RoutesModule,
        ExtensionsModule,
        RouterModule
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: ReuseTabStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
