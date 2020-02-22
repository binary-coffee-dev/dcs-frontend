import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {MaterialModule} from '../../core/material/material.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule {
}
