import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RoutesRoutingModule } from '@/app/routes/routes-routing.module';
import { SystemModule }        from '@/app/routes/system/system.module';
import { ArtLayoutComponent }  from '@/app/routes/art-layout/art-layout.component';
import { ArtHeaderComponent }  from '@/app/routes/art-layout/art-header/art-header.component';
import { ArtSidenavComponent } from '@/app/routes/art-layout/art-sidenav/art-sidenav.component';
import { ReuseTabsComponent }  from '@/app/routes/art-layout/reuse-tab/reuse-tabs.component';
import { SharedModule }        from '@/app/shared/shared.module';
import { ExtensionsModule }    from '@/app/extensions/extensions.module';

@NgModule({
    declarations: [
        ArtLayoutComponent,
        ArtHeaderComponent,
        ArtSidenavComponent,
        ReuseTabsComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ExtensionsModule,
        SystemModule,
        RoutesRoutingModule
    ]
})
export class RoutesModule {
}
