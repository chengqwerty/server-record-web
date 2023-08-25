import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule }         from './app-routing.module';
import { AppComponent }             from './app.component';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { SharedModule }             from './shared/shared.module';
import { ServerNamespaceComponent } from './server-namespace/server-namespace.component';
import { SystemModule }             from './system/system.module';
import { ExtensionsModule }         from './extensions/extensions.module';

@NgModule({
    declarations: [
        AppComponent,
        ServerNamespaceComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        ExtensionsModule,
        SystemModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
