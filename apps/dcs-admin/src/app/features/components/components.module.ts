import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MaterialModule,
  FooterComponent,
  SocialLinksComponent
} from '@dcs-libs/shared';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  imports: [CommonModule, RouterModule, MaterialModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
    SocialLinksComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NotificationsComponent,
    SocialLinksComponent
  ]
})
export class ComponentsModule {}
