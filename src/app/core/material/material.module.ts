import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  exports: [
    MatToolbarModule,
    FlexLayoutModule
  ]
})
export class MaterialModule {
}
