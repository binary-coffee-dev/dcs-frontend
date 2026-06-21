import { Component, inject, output, signal } from '@angular/core';

import { Environment, ENVIRONMENT } from '@dcs-libs/shared';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  private env = inject<Environment>(ENVIRONMENT);

  getBlogUrl = signal(this.env.siteUrl);

  openSidenav = output<void>();
}
