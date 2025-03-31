import { Component }                       from '@angular/core';
import { AppSettings, defaults }                             from '@/app/core/setting';
import { MatSidenav, MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { ArtHeaderComponent }                                from '@/app/routes/art-layout/art-header/art-header.component';
import { RouterOutlet }                    from '@angular/router';
import { ReuseTabsComponent }              from '@/app/routes/art-layout/reuse-tab/reuse-tabs.component';
import { ArtSidenavComponent }             from '@/app/routes/art-layout/art-sidenav/art-sidenav.component';
import { CommonModule }                    from '@angular/common';

@Component({
    selector: 'app-art-layout',
    standalone: true,
    templateUrl: './art-layout.component.html',
    imports: [
        MatSidenavModule,
        ArtHeaderComponent,
        RouterOutlet,
        ReuseTabsComponent,
        ArtSidenavComponent,
        CommonModule
    ],
    styleUrls: ['./art-layout.component.scss']
})
export class ArtLayoutComponent {

    public option: AppSettings;

    constructor() {
        this.option = defaults;
    }

}
