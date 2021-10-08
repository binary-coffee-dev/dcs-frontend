import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LAZYLOAD_IMAGE_HOOKS, LazyLoadImageModule, ScrollHooks } from 'ng-lazyload-image';

import { TagsModule } from '@dcs-libs/shared';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../../core/material';
import { PostItemComponent } from './post-item/post-item.component';
import { PostsGuard } from './guards';
import { ServicesModule } from '../../core/services';
import { PaginationComponent } from './pagination';
import { RecentCommentsComponent } from './recent-comments/recent-comments.component';
import { LimitTextPipe } from './recent-comments/limit-text.pipe';
import { FilterComponent } from './filter/filter.component';
import { RecentPodcastsComponent } from './recent-podcasts/recent-podcasts.component';
import { TopActiveUsersModule } from '../components/top-active-users/top-active-users.module';
import { TopPopularUsersModule } from '../components/top-popular-users/top-popular-users.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PostItemComponent,
    PaginationComponent,
    RecentCommentsComponent,
    LimitTextPipe,
    FilterComponent,
    RecentPodcastsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ServicesModule,
    LazyLoadImageModule,
    TagsModule,
    TopActiveUsersModule,
    TopPopularUsersModule
  ],
  providers: [PostsGuard, { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }]
})
export class DashboardModule {
}
