import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '@dcs-libs/shared';
import {DonateComponent} from './donate.component';
import {DonateRoutingModule} from './donate-routing.module';
import {BitcoinComponent} from './bitcoin/bitcoin.component';


@NgModule({
  declarations: [DonateComponent, BitcoinComponent],
  entryComponents: [BitcoinComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DonateRoutingModule
  ]
})
export class DonateModule {
}
