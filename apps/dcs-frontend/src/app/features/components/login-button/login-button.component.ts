import {Component, Inject, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {ENVIRONMENT, Environment, WINDOW} from '@dcs-libs/shared';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {
  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment,
    private store: Store
  ) {
  }

  ngOnInit(): void {
  }

  loginAction() {
    const redir = encodeURIComponent(this.window.location.href);
    const urlBase = this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const loginUrl = new URL('./login', urlBase);
    this.window.location.href = `${loginUrl}?redir=${redir}`;
  }
}
