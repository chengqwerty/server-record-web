import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServerNamespaceComponent } from "./server-namespace/server-namespace.component";

const routes: Routes = [
  {
    path: 'sys',
    loadChildren: () => import('./system/system.module').then(module => module.SystemModule)
  },
  {
    path: 'sns',
    component: ServerNamespaceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
