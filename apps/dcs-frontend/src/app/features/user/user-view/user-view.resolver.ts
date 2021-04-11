import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import {
  FetchCommentsCountAction,
  FetchPostsAction,
  FetchUserByUsernameAction,
  Post,
  PostState,
  SetFiltersAction,
  User,
  UserInfoState,
  Where
} from '@dcs-libs/shared';

export interface UserView {
  user: User;
  posts: Post[];
  count: number;
  commentsCount: number;
}

@Injectable()
export class UserViewResolver implements Resolve<UserView> {

  user: User;
  posts: Post[];
  count: number;
  commentsCount: number;

  constructor(private store: Store) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserView> | Promise<UserView> | UserView {
    return this.store.dispatch(new FetchUserByUsernameAction(route.paramMap.get('username')))
      .pipe(
        tap(() => this.user = this.store.selectSnapshot(UserInfoState.user)),
        flatMap(() => this.store.dispatch(new SetFiltersAction({author: this.user.id, enable: true} as Where))),
        flatMap(() => this.store.dispatch(new FetchPostsAction())),
        flatMap(() => this.store.dispatch(new FetchCommentsCountAction(this.user.id))),
        tap(() => this.posts = this.store.selectSnapshot(PostState.posts)),
        tap(() => this.count = this.store.selectSnapshot(PostState.count)),
        tap(() => this.commentsCount = this.store.selectSnapshot(UserInfoState.commentsCount)),
        map(() => ({user: this.user, posts: this.posts, count: this.count, commentsCount: this.commentsCount} as UserView))
      );
  }
}
