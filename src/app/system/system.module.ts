import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { SharedModule }        from '../shared/shared.module';
import { AreaComponent }       from './area/area.component';
import { AreaDialogComponent } from './area/area-dialog/area-dialog.component';
import { AreaTreeComponent }   from './area/area-tree/area-tree.component';
import { ExtensionsModule }    from '@/app/extensions/extensions.module';


@NgModule({
    declarations: [
        AreaComponent,
        AreaDialogComponent,
        AreaTreeComponent
    ],
    imports: [
        SharedModule,
        SystemRoutingModule,
        ExtensionsModule
    ]
})
export class SystemModule {
}
