import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MaterialModule} from '../../core/material';
import {PostItemComponent} from './post-item/post-item.component';
import {PostsGuard} from './guards';
import {ServicesModule} from '../../core/services';
import {PaginationComponent} from './pagination';

@NgModule({
  declarations: [DashboardComponent, PostItemComponent, PaginationComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ServicesModule
  ],
  providers: [PostsGuard]
})
export class DashboardModule {
}
