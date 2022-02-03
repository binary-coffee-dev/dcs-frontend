import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserViewResolver } from './user-view/user-view.resolver';
import { UsersOverViewResolver } from './users-overview/users-overview.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersOverviewComponent,
    resolve: {
      info: UsersOverViewResolver
    }
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
  providers: [UserViewResolver, UsersOverViewResolver]
})
export class UserRoutingModule {
}
