import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  AuthErrorAction,
  AuthState,
  Environment,
  ENVIRONMENT,
  LoginAction,
  Provider,
  WINDOW
} from '@dcs-libs/shared';
import { PROVIDERS } from './providers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: false
})
export class AuthComponent {
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private window = inject<Window>(WINDOW);
  private env = inject<Environment>(ENVIRONMENT);
  private routerData = toSignal(this.route.data);

  authError = toSignal(this.store.select(AuthState.authError));
  providers = signal(PROVIDERS);

  isLocalProvider = computed(() => this.routerData()?.['provider'] === 'local');

  loginForm = new UntypedFormGroup({
    identifier: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required)
  });

  login() {
    if (
      this.loginForm.valid &&
      this.checkEmptySpaces(this.loginForm.controls['identifier'].value)
    ) {
      const identifier = this.loginForm.controls['identifier'].value;
      const password = this.loginForm.controls['password'].value;
      this.store.dispatch(new LoginAction(identifier, password)).subscribe(() => {
        const redir = this.route.snapshot.queryParamMap.get('redir');
        const tokenOn = this.route.snapshot.queryParamMap.get('tokenOn');
        if (redir) {
          // toDo 21.11.21, guille, validate query params
          this.window.location.href =
            redir + (tokenOn ? '?token=' + this.store.selectSnapshot(AuthState.token) : '');
        } else {
          this.redirectToDashboard();
        }
      });
    } else {
      this.store.dispatch(new AuthErrorAction('Missing data in login'));
    }
  }

  loginWithProvider(provider: Provider) {
    const siteDashboardUrl =
      this.env.siteDashboardUrl + (this.env.siteDashboardUrl.endsWith('/') ? '' : '/');
    const redir = this.route.snapshot.queryParamMap.get('redir');
    const tokenOn = this.route.snapshot.queryParamMap.get('tokenOn');
    const redirectUri = new URL(
      `./provider/${provider.name}` +
        (redir ? `?${tokenOn ? 'tokenOn=true&' : ''}redir=${encodeURIComponent(redir)}` : ''),
      siteDashboardUrl
    ).href;
    const queryParams = {
      client_id: this.env.githubClientId,
      scope: provider.scope,
      redirect_uri: redirectUri
    };
    this.window.location.href = `${provider.url}?${this.queryParamsToString(queryParams)}`;
  }

  queryParamsToString(object: any) {
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

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
