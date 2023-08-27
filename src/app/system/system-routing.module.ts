import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartComponent }      from '@/app/system/depart/depart.component';
import { AreaComponent }        from '@/app/system/area/area.component';

const routes: Routes = [
    {
        path: 'area',
        component: AreaComponent,
        data: { title: '系统区域' }
    },
    {
        path: 'depart',
        component: DepartComponent,
        data: { title: '系统部门'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {
}
