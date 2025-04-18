import { Routes }             from '@angular/router';
import { LoginPageComponent } from '@/app/routes/login-page/login-page.component';
import { ArtLayoutComponent }   from '@/app/routes/art-layout/art-layout.component';
import { AuthGuard } from '@/app/routes/guard/auth.guard';

export const routes: Routes = [
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
        canActivate: [AuthGuard],
        children:[
            {
                path: '',
                redirectTo: 'sys/area',
                pathMatch: 'full'
            },
            {
                path: 'sys',
                loadChildren: () => import('./routes/system/system.module').then(module => module.SystemModule)
            },
        ]
    }
];
