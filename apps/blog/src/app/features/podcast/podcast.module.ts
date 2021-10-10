import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@dcs-libs/shared';
import { PodcastComponent } from './podcast.component';
import { PodcastRoutingModule } from './podcast-routing.module';
import { PodcastListComponent } from './podcast-list/podcast-list.component';

@NgModule({
  declarations: [PodcastComponent, PodcastListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PodcastRoutingModule
  ]
})
export class PodcastModule { }
