import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@dcs-libs/shared';

import { InfoBarComponent } from './info-bar/info-bar.component';


@NgModule({
  declarations: [
    InfoBarComponent
  ],
  exports: [
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
