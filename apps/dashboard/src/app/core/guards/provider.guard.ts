import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { AuthState, LoginWithProviderAction, WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);
  private window = inject<Window>(WINDOW);

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const provider = next.paramMap.get('provider');
    const code = next.queryParamMap.get('code');
    const redir = next.queryParamMap.get('redir');
    const tokenOn = next.queryParamMap.get('tokenOn');
    return this.store.dispatch(new LoginWithProviderAction(provider, code)).pipe(
      map((_result) => {
        if (redir) {
          this.window.location.href =
            redir + (tokenOn ? '?token=' + this.store.selectSnapshot(AuthState.token) : '');
          return false;
        }
        this.router.navigate(['dashboard']);
        return true;
      })
    );
  }
}
