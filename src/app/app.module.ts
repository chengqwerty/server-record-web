import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { SharedModule }             from './shared/shared.module';
import { ServerNamespaceComponent } from './server-namespace/server-namespace.component';
import { SystemModule }             from './system/system.module';
import { ExtensionsModule }         from './extensions/extensions.module';
import { ArtLayoutComponent } from './art-layout/art-layout.component';
import { ArtHeaderComponent } from './art-layout/art-header/art-header.component';
import { ArtSidenavComponent } from './art-layout/art-sidenav/art-sidenav.component';
import { ReuseTabsComponent } from './art-layout/reuse-tab/reuse-tabs.component';
import { RouteReuseStrategy } from "@angular/router";
import { ReuseTabStrategy } from "@/app/art-layout/reuse-tab/reuse-tabs.strategy";

@NgModule({
    declarations: [
        AppComponent,
        ServerNamespaceComponent,
        ArtLayoutComponent,
        ArtHeaderComponent,
        ArtSidenavComponent,
        ReuseTabsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        ExtensionsModule,
        SystemModule
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: ReuseTabStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
