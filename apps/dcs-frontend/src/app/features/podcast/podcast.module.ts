import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@dcs-libs/shared';
import { PodcastComponent } from './podcast.component';
import { PodcastRoutingModule } from './podcast-routing.module';

@NgModule({
  declarations: [PodcastComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PodcastRoutingModule
  ]
})
export class PodcastModule { }
