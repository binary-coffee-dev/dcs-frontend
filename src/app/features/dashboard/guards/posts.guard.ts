import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';

import {FetchPostsAction} from '../../../core/redux/actions';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(new FetchPostsAction()).subscribe(() => {});
    return true;
  }
}
