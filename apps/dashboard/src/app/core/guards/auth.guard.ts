import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthState, WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private store = inject(Store);
  private router = inject(Router);
  private window = inject<Window>(WINDOW);

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store.selectSnapshot(AuthState.token) !== '') {
      return true;
    }
    return this.router
      .navigate(['login'], {
        queryParams: { redir: this.window.location.href }
      })
      .then(() => false);
  }
}
