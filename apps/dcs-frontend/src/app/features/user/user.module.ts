import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '@dcs-libs/shared';
import { UserComponent } from './user.component';
import { UserRoutingModule } from "./user-routing.module";
import { UserViewComponent } from './user-view/user-view.component';



@NgModule({
  declarations: [UserComponent, UserViewComponent],
  imports: [
    CommonModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
