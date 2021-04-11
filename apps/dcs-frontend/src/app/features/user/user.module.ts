import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@dcs-libs/shared';
import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { TopActiveUsersModule } from '../components/top-active-users/top-active-users.module';
import { TopPopularUsersModule } from '../components/top-popular-users/top-popular-users.module';

@NgModule({
  declarations: [
    UsersOverviewComponent,
    UserViewComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule,
    TopActiveUsersModule,
    TopPopularUsersModule
  ]
})
export class UserModule {
}
