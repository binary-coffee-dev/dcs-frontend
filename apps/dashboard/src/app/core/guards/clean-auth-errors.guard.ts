import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';

import { Observable, mergeMap, of } from 'rxjs';
import { Store } from '@ngxs/store';

import { AuthErrorAction } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class CleanAuthErrorsGuard implements CanActivate {
  private store = inject(Store);

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new AuthErrorAction(undefined)).pipe(mergeMap(() => of(true)));
  }
}
