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
    // toDo: doplicated code
    let url = 'assets/images/noavatar.png';
    if (this.me && this.me.avatarUrl) {
      url = this.me.avatarUrl.startsWith('http')
        ? this.me.avatarUrl
        : new URL(this.me.avatarUrl, this.env.apiUrl).href;
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
