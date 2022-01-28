import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MomentService } from './moment.service';
import { ResourceService } from './resource.service';
import { MetaTagsService } from './meta-tags.service';
import { ScrollService } from './scroll.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    MomentService,
    ResourceService,
    MetaTagsService,
    ScrollService
  ]
})
export class ServicesModule {
}
