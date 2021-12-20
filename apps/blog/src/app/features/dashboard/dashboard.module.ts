import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsModule } from '@dcs-libs/shared';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../../core/material';
import { PostItemComponent } from './post-item/post-item.component';
import { PostsGuard } from './guards';
import { ServicesModule } from '../../core/services';
import { PaginationComponent } from './pagination';
import { FilterComponent } from './filter/filter.component';
import { TopActiveUsersModule } from '../components/top-active-users/top-active-users.module';
import { TopPopularUsersModule } from '../components/top-popular-users/top-popular-users.module';
import { SliderComponent } from '../components/slider/slider.component';
import { InfoBarComponent } from './info-bar/info-bar.component';

@NgModule({
  declarations: [
    DashboardComponent,
    PostItemComponent,
    PaginationComponent,
    FilterComponent,
    SliderComponent,
    InfoBarComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ServicesModule,
    TagsModule,
    TopActiveUsersModule,
    TopPopularUsersModule
  ],
  providers: [PostsGuard]
})
export class DashboardModule {
}
