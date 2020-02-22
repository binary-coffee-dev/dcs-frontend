import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ComponentsModule} from '../../components/components.module';
import {AdminLayoutRoutingModule} from './admin-layout.routing.module';
import {AdminLayoutComponent} from './admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    ComponentsModule
  ],
  declarations: [AdminLayoutComponent]
})
export class AdminLayoutModule {
}
