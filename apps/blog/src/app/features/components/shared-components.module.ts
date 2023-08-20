import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@dcs-libs/shared';

import { InfoBarComponent } from './info-bar/info-bar.component';
import { SubscribeComponent } from "./subscribe/subscribe.component";


@NgModule({
  declarations: [
    SubscribeComponent,
    InfoBarComponent
  ],
  exports: [
    SubscribeComponent,
    InfoBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ]
})
export class SharedComponentsModule {
}
