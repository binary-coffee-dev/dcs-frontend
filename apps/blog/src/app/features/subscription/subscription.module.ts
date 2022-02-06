import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsModule } from '@ngxs/store';

import { SubscriptionService, SubscriptionState } from '@dcs-libs/shared';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { MaterialModule } from '../../core/material';

@NgModule({
  declarations: [SubscriptionComponent],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
    NgxsModule.forFeature([SubscriptionState]),
    MaterialModule
  ],
  providers: [SubscriptionService]
})
export class SubscriptionModule {
}
