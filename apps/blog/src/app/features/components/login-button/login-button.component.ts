import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';

import { AuthState, ENVIRONMENT, Environment, LogoutAction, UrlUtilsService, User, WINDOW } from '@dcs-libs/shared';
import { LoginService } from '../../../core/services';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.scss']
})
export class LoginButtonComponent implements OnInit {

  isLogin = false;
  me?: User;
  isBrowser: boolean;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment,
    private store: Store,
    private url: UrlUtilsService,
    private loginService: LoginService,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.store.select(AuthState.isLogin).subscribe(isLogin => this.isLogin = isLogin);
      this.store.select(AuthState.me).subscribe(me => this.me = me);
    }
  }

  loginAction() {
    this.loginService.loginAction();
  }

  profileLink() {
    return `/users/${this.me?.username || ''}`;
  }

  editProfileLink() {
    return `${this.env.siteDashboardUrl}/user-profile`;
  }

  articlesLink() {
    return `${this.env.siteDashboardUrl}/articles`;
  }

  newArticleLink() {
    return `${this.env.siteDashboardUrl}/articles/create`;
  }

  logoutAction() {
    this.store.dispatch(new LogoutAction());
  }
}
