import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Store} from '@ngxs/store';

import {AuthError, AuthErrorAction, AuthState, Environment, ENVIRONMENT, LoginAction, Provider, WINDOW} from '@dcs-libs/shared';
import {PROVIDERS} from './providers';

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
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
  }

  ngOnInit(): void {
    this.store.select(AuthState.authError).subscribe(error => this.authError = error);
  }

  login() {
    if (this.loginForm.valid && this.checkEmptySpaces(this.loginForm.controls.identifier.value)) {
      const identifier = this.loginForm.controls.identifier.value;
      const password = this.loginForm.controls.password.value;
      this.store.dispatch(new LoginAction(identifier, password)).subscribe(() => {
        this.redirectToDashboard();
      });
    } else {
      this.store.dispatch(new AuthErrorAction('Missing data in login'));
    }
  }

  loginWithProvider(provider: Provider) {
    const queryParams = {
      client_id: this.environment.githubClientId,
      scope: provider.scope
    };
    console.log(this.queryParamsToString(queryParams));
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
      this.router.navigate(['dashboard']);
    }
  }

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
