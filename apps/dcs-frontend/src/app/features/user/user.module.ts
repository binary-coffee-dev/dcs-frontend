import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '@dcs-libs/shared';
import { UsersOverviewComponent } from './users-overview/users-overview.component';
import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';


@NgModule({
  declarations: [UsersOverviewComponent, UserViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
