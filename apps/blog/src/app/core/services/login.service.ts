import { Inject, Injectable } from '@angular/core';
import { Environment, ENVIRONMENT, WINDOW } from '@dcs-libs/shared';

@Injectable()
export class LoginService {

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment
  ) {
  }

  loginAction() {
    const redir = encodeURIComponent(this.window.location.href);
    const urlBase = this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const loginUrl = new URL('./login', urlBase);
    this.window.location.href = `${loginUrl}?redir=${redir}`;
  }
}
