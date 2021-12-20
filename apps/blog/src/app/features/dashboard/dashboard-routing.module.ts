import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { PostsGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    data: {
      isHome: true
    },
    component: DashboardComponent,
    canActivate: [PostsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
