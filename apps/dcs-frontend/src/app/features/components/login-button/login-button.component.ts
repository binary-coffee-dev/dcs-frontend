import { Component, Inject, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { AuthState, ENVIRONMENT, Environment, LogoutAction, UrlUtilsService, User, WINDOW } from '@dcs-libs/shared';

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
    private store: Store,
    private url: UrlUtilsService
  ) {
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
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

  openUserProfile() {
    this.window.location.href = `${this.env.siteDashboardUrl}/user-profile`;
  }

  openArticles() {
    this.window.location.href = `${this.env.siteDashboardUrl}/articles`;
  }

  logoutAction() {
    this.store.dispatch(new LogoutAction());
  }
}
