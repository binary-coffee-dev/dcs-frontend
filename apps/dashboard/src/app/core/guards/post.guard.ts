import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map } from 'rxjs/operators';

import { PostAction } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class PostGuard implements CanActivate {
  private store = inject(Store);

  canActivate(
    next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new PostAction(next.params['id'])).pipe(map(() => true));
  }
}
