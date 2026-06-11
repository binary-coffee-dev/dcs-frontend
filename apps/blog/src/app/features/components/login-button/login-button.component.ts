import { Component, OnInit, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';

import { AuthState, ENVIRONMENT, Environment, LogoutAction, UrlUtilsService, User } from '@dcs-libs/shared';
import { LoginService } from '../../../core/services';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss'],
    standalone: false
})
export class LoginButtonComponent implements OnInit {
  private env = inject<Environment>(ENVIRONMENT);
  private store = inject(Store);
  private url = inject(UrlUtilsService);
  private loginService = inject(LoginService);


  isLogin = signal<boolean>(false);
  isBrowser = signal<boolean>(false);

  me?: User;

  constructor() {
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
  }

  ngOnInit(): void {
    if (this.isBrowser()) {
      this.store.select(AuthState.isLogin).subscribe(isLogin => this.isLogin.set(isLogin));
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
