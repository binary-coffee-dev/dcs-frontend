import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {PostsResolver} from './resolvers';
import {MaterialModule} from '../../core/material';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ],
  providers: [PostsResolver]
})
export class DashboardModule {
}
