import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  {
    path: '',
    component: UsersOverviewComponent
  },
  {
    path: 'binary-coffee',
    component: UserViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
