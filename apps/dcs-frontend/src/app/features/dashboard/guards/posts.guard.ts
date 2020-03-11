import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {map} from 'rxjs/operators';

import {FetchPostsAction} from '@dcs-libs/shared';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new FetchPostsAction()).pipe(map(() => true));
  }
}
