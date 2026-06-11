import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';

import { AuthState, ENVIRONMENT, Environment, LogoutAction, UrlUtilsService, User, WINDOW } from '@dcs-libs/shared';
import { LoginService } from '../../../core/services';

@Component({
    selector: 'app-login-button',
    templateUrl: './login-button.component.html',
    styleUrls: ['./login-button.component.scss'],
    standalone: false
})
export class LoginButtonComponent implements OnInit {
  private window = inject<Window>(WINDOW);
  private env = inject<Environment>(ENVIRONMENT);
  private store = inject(Store);
  private url = inject(UrlUtilsService);
  private loginService = inject(LoginService);


  isLogin = false;
  me?: User;
  isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);

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
