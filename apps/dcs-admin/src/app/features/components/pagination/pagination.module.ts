import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from '@dcs-libs/shared';
import {PaginationComponent} from './pagination.component';

@NgModule({
  declarations: [PaginationComponent],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PaginationModule {
}
