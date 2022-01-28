import { Inject, Injectable } from '@angular/core';
import { Environment, ENVIRONMENT, WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment
  ) {
  }

  loginAction() {
    this.loginWithRedir(this.window.location.href);
  }

  loginWithRedir(redir: string) {
    const urlBase = this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const loginUrl = new URL('./login', urlBase);
    this.window.location.href = `${loginUrl}?redir=${encodeURIComponent(redir)}`;
  }
}
