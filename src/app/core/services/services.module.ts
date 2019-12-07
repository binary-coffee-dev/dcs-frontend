import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MomentService} from './moment.service';

@NgModule({
  imports: [CommonModule],
  providers: [MomentService]
})
export class ServicesModule {
}
