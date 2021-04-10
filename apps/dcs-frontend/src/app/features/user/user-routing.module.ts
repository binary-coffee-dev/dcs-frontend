import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewResolver } from './user-view/user-view.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersOverviewComponent
  },
  {
    path: ':username',
    component: UserViewComponent,
    resolve: {
      userInfo: UserViewResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserViewResolver]
})
export class UserRoutingModule {
}
