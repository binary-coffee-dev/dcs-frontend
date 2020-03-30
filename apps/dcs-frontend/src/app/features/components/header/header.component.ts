import { Component, Inject } from '@angular/core';

import { ENVIRONMENT, Environment, WINDOW } from '@dcs-libs/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment) { }

  openRoot() {
    this.window.location.href = this.env.siteUrl;
  }
}
