import { NgModule } from '@angular/core';

import { SystemRoutingModule }   from './system-routing.module';
import { AreaComponent }         from './area/area.component';
import { AreaDialogComponent }   from './area/area-dialog/area-dialog.component';
import { AreaTreeComponent }     from './area/area-tree/area-tree.component';
import { ExtensionsModule }      from '@/app/extensions/extensions.module';
import { DepartComponent }       from './depart/depart.component';
import { MenuComponent }         from './menu/menu.component';
import { MenuTreeComponent }     from './menu/menu-tree/menu-tree.component';
import { SharedModule }          from '@/app/shared/shared.module';
import { MenuDialogComponent }   from './menu/menu-dialog/menu-dialog.component';
import { IconListComponent }     from './icon-list/icon-list.component';
import { IconDialogComponent }   from './icon-list/icon-dialog/icon-dialog.component';
import { DepartTreeComponent }   from './depart/depart-tree/depart-tree.component';
import { DepartDialogComponent } from './depart/depart-dialog/depart-dialog.component';
import { MyAnimationComponent }  from '@/app/routes/system/my-animation/my-animation.component';
import { ArtDialogModule }       from '@think-make/art-extends/art-dialog';
import { MatDialogModule }       from '@angular/material/dialog';
import { DialogModule }          from '@angular/cdk/dialog';


@NgModule({
    declarations: [
        AreaComponent,
        AreaDialogComponent,
        AreaTreeComponent,
        MyAnimationComponent,
        DepartComponent,
        MenuComponent,
        MenuTreeComponent,
        MenuDialogComponent,
        IconListComponent,
        IconDialogComponent,
        DepartTreeComponent,
        DepartDialogComponent
    ],
    imports: [
        SystemRoutingModule,
        SharedModule,
        MatDialogModule,
        ArtDialogModule,
        ExtensionsModule,
        DialogModule
    ]
})
export class SystemModule {
}
