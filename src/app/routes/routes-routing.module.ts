import { RouterModule, Routes } from '@angular/router';
import { NgModule }             from '@angular/core';
import { ArtLayoutComponent }   from '@/app/routes/art-layout/art-layout.component';
import { LoginPageComponent }   from '@/app/routes/login-page/login-page.component';
import { authGuard }            from '@/app/routes/guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent,
        data: { reuse: false }
    },
    {
        path: 'bus',
        component: ArtLayoutComponent,
        canActivate: [authGuard],
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
