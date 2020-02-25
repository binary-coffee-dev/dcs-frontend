import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateComponent } from './donate.component';
import { MaterialModule } from '../../core/material';
import { DonateRoutingModule } from './donate-routing.module';


@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DonateRoutingModule
  ]
})
export class DonateModule { }
