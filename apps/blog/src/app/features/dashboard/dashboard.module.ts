import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { TagsModule } from '@dcs-libs/shared';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../../core/material';
import { PostsGuard } from './guards';
import { ServicesModule } from '../../core/services';
import { PaginationComponent } from './pagination';
import { TopActiveUsersModule } from '../components/top-active-users/top-active-users.module';
import { TopPopularUsersModule } from '../components/top-popular-users/top-popular-users.module';
import { SliderComponent } from '../components/slider/slider.component';
import { SharedComponentsModule } from '../components/shared-components.module';
import { PostItemModule } from '../components/post-item/post-item.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PaginationComponent,
    SliderComponent,
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaterialModule,
        ServicesModule,
        TagsModule,
        TopActiveUsersModule,
        TopPopularUsersModule,
        SharedComponentsModule,
        PostItemModule,
        NgOptimizedImage
    ],
  providers: [PostsGuard]
})
export class DashboardModule {
}
