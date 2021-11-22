import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import { AuthError, AuthErrorAction, AuthState, Environment, ENVIRONMENT, LoginAction, Provider, WINDOW } from '@dcs-libs/shared';
import { PROVIDERS } from './providers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authError: AuthError = null;

  providers = PROVIDERS;

  loginForm = new FormGroup({
    identifier: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private env: Environment
  ) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.authError).subscribe(error => this.authError = error);
  }

  isLocalEnvironment() {
    return Boolean(this.env.local);
  }

  login() {
    if (this.loginForm.valid && this.checkEmptySpaces(this.loginForm.controls.identifier.value)) {
      const identifier = this.loginForm.controls.identifier.value;
      const password = this.loginForm.controls.password.value;
      this.store.dispatch(new LoginAction(identifier, password)).subscribe(() => {
        const redir = this.route.snapshot.queryParamMap.get('redir');
        const tokenOn = this.route.snapshot.queryParamMap.get('tokenOn');
        if (redir) {
          // toDo 21.11.21, guille, validate query params
          this.window.location.href = redir + (tokenOn ? '?token=' + this.store.selectSnapshot(AuthState.token) : '');
        } else {
          this.redirectToDashboard();
        }
      });
    } else {
      this.store.dispatch(new AuthErrorAction('Missing data in login'));
    }
  }

  loginWithProvider(provider: Provider) {
    const siteDashboardUrl = this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const redir = this.route.snapshot.queryParamMap.get('redir');
    const tokenOn = this.route.snapshot.queryParamMap.get('tokenOn');
    const redirectUri =
      new URL(`./provider/${provider.name}` + (redir ? `?${tokenOn ? 'tokenOn=true&' : ''}redir=${encodeURIComponent(redir)}` : ''),
        siteDashboardUrl).href;
    let queryParams = {
      client_id: this.env.githubClientId,
      scope: provider.scope,
      redirect_uri: redirectUri
    };
    this.window.location.href = `${provider.url}?${this.queryParamsToString(queryParams)}`;
  }

  queryParamsToString(object) {
    return Object.keys(object).reduce((p, k) => {
      if (p !== '') {
        p += '&';
      }
      return p + `${k}=${encodeURIComponent(object[k])}`;
    }, '');
  }

  redirectToDashboard() {
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '') {
      this.router.navigate(['']);
    }
  }

  redirectToSiteMainView() {
    const urlBase = this.env.siteUrl;
    const loginUrl = new URL(urlBase);
    this.window.location.href = `${loginUrl}`;
  }

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
