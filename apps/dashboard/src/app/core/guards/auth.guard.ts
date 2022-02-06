import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState, WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store.selectSnapshot(AuthState.token) !== '') {
      return true;
    }
    return this.router.navigate(['login'], {
      queryParams: { redir: this.window.location.href }
    }).then(() => false);
  }
}
