import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtLayoutComponent } from "@/app/art-layout/art-layout.component";

const routes: Routes = [
    {
        path: '',
        component: ArtLayoutComponent,
        children:[
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
export class AppRoutingModule {
}
