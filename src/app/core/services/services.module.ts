import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MomentService} from './moment.service';
import {ResourceService} from './resource.service';

@NgModule({
  imports: [CommonModule],
  providers: [MomentService, ResourceService]
})
export class ServicesModule {
}
