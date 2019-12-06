import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {PostsResolver} from './resolvers';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  providers: [PostsResolver]
})
export class DashboardModule {
}
