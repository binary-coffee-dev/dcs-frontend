import {Component, Inject, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {AuthState, ENVIRONMENT, Environment, LogoutAction, User, WINDOW} from '@dcs-libs/shared';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  isLogin = false;
  me: User;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment,
    private store: Store
  ) {
  }

  getUserImage() {
    let url = 'assets/images/noavatar.png';
    if (this.me && this.me.avatar && this.me.avatar.url) {
      url = this.me.avatar.url.startsWith('http')
        ? this.me.avatar.url
        : new URL(this.me.avatar.url, this.env.apiUrl).href;
    }
    return url;
  }

  ngOnInit(): void {
    this.store.select(AuthState.isLogin).subscribe(isLogin => this.isLogin = isLogin);
    this.store.select(AuthState.me).subscribe(me => this.me = me);
  }

  loginAction() {
    const redir = encodeURIComponent(this.window.location.href);
    const urlBase = this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const loginUrl = new URL('./login', urlBase);
    this.window.location.href = `${loginUrl}?redir=${redir}`;
  }

  logoutAction() {
    this.store.dispatch(new LogoutAction());
  }
}
