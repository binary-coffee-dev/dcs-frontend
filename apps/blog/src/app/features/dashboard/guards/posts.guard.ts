import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { map, mergeMap } from 'rxjs/operators';

import {
  FetchPodcastAction,
  FetchPostsAction,
  FetchTopActiveUsersAction, FetchTopPopularUsersAction,
  RecentCommentAction,
  SetFiltersAction,
  Where
} from '@dcs-libs/shared';

@Injectable()
export class PostsGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new SetFiltersAction({enable: true} as Where)).pipe(
      mergeMap(() => this.store.dispatch(new FetchPostsAction())),
      mergeMap(() => this.store.dispatch(new RecentCommentAction())),
      mergeMap(() => this.store.dispatch(new FetchTopActiveUsersAction())),
      mergeMap(() => this.store.dispatch(new FetchTopPopularUsersAction())),
      mergeMap(() => this.store.dispatch(new FetchPodcastAction())),
      map(() => true)
    );
  }
}
