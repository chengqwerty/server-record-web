import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaComponent }        from '@/app/routes/system/area/area.component';
import { DepartComponent }      from '@/app/routes/system/depart/depart.component';
import { MenuComponent }        from '@/app/routes/system/menu/menu.component';
import { IconListComponent }    from '@/app/routes/system/icon-list/icon-list.component';

const routes: Routes = [
    {
        path: 'area',
        component: AreaComponent,
        data: { title: '系统区域' }
    },
    {
        path: 'depart',
        component: DepartComponent,
        data: { title: '系统部门' }
    },
    {
        path: 'menu',
        component: MenuComponent,
        data: { title: '菜单管理' }
    },
    {
        path: 'icon',
        component: IconListComponent,
        data: { title: '图标管理' }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {
}
