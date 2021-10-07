import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { flatMap, map } from 'rxjs/operators';

import { FetchPostsAction, RecentCommentAction, SetFiltersAction, Where } from '@dcs-libs/shared';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new SetFiltersAction({enable: true} as Where)).pipe(
      flatMap(() => this.store.dispatch(new FetchPostsAction())),
      flatMap(() => this.store.dispatch(new RecentCommentAction())),
      map(() => true)
    );
  }
}
