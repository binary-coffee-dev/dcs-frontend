import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { MaterialModule } from '@dcs-libs/shared';
import { DonateComponent } from './donate.component';
import { DonateRoutingModule } from './donate-routing.module';


@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DonateRoutingModule,
    ClipboardModule
  ]
})
export class DonateModule {
}
