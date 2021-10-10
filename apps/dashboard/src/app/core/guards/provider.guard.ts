import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { LoginWithProviderAction, WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class ProviderGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const provider = next.paramMap.get('provider');
    const code = next.queryParamMap.get('code');
    const redir = next.queryParamMap.get('redir');
    return this.store.dispatch(new LoginWithProviderAction(provider, code)).pipe(
      map((result) => {
        if (redir) {
          this.window.location.href = redir;
          return false;
        }
        this.router.navigate(['dashboard']);
        return result;
      })
    );
  }
}
