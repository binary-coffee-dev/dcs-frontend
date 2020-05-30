import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LazyLoadImageModule, scrollPreset} from 'ng-lazyload-image';

import {TagsModule} from '@dcs-libs/shared';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MaterialModule} from '../../core/material';
import {PostItemComponent} from './post-item/post-item.component';
import {PostsGuard} from './guards';
import {ServicesModule} from '../../core/services';
import {PaginationComponent} from './pagination';
import {RecentCommentsComponent} from './recent-comments/recent-comments.component';
import {LimitTextPipe} from './recent-comments/limit-text.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    PostItemComponent,
    PaginationComponent,
    RecentCommentsComponent,
    LimitTextPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ServicesModule,
    LazyLoadImageModule.forRoot({preset: scrollPreset}),
    TagsModule
  ],
  providers: [PostsGuard]
})
export class DashboardModule {
}
