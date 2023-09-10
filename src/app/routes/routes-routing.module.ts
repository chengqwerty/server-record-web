import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
import { ArtLayoutComponent }   from '@/app/routes/art-layout/art-layout.component';
import { LoginPageComponent }   from '@/app/routes/login-page/login-page.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'bus',
        component: ArtLayoutComponent,
        children:[
            {
                path: '',
                redirectTo: 'sys/area',
                pathMatch: 'full'
            },
            {
                path: 'sys',
                loadChildren: () => import('./system/system.module').then(module => module.SystemModule)
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutesRoutingModule {
}
