import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MaterialModule, SharedModule,
} from '@dcs-libs/shared';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
  ]
})
export class ComponentsModule {}
