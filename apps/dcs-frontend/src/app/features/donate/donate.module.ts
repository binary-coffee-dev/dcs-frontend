import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardModule } from 'ngx-clipboard';

import { MaterialModule } from '@dcs-libs/shared';
import { DonateComponent } from './donate.component';
import { DonateRoutingModule } from './donate-routing.module';
import { BitcoinComponent } from './bitcoin/bitcoin.component';
import { EnzonaComponent } from './enzona/enzona.component';


@NgModule({
  declarations: [DonateComponent, BitcoinComponent, EnzonaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DonateRoutingModule,
    ClipboardModule
  ]
})
export class DonateModule {
}
