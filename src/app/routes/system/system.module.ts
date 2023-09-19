import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { AreaComponent }       from './area/area.component';
import { AreaDialogComponent } from './area/area-dialog/area-dialog.component';
import { AreaTreeComponent }   from './area/area-tree/area-tree.component';
import { ExtensionsModule }    from '@/app/extensions/extensions.module';
import { DepartComponent }     from './depart/depart.component';
import { MenuComponent }       from './menu/menu.component';
import { MenuTreeComponent }   from './menu/menu-tree/menu-tree.component';
import { SharedModule }        from '@/app/shared/shared.module';
import { MenuDialogComponent } from './menu/menu-dialog/menu-dialog.component';
import { IconListComponent } from './icon-list/icon-list.component';


@NgModule({
    declarations: [
        AreaComponent,
        AreaDialogComponent,
        AreaTreeComponent,
        DepartComponent,
        MenuComponent,
        MenuTreeComponent,
        MenuDialogComponent,
        IconListComponent
    ],
    imports: [
        SystemRoutingModule,
        SharedModule,
        ExtensionsModule
    ]
})
export class SystemModule {
}
