import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

import {
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

  user: User = {} as unknown as User;
  posts: Post[] = [];
  count: number = 0;
  commentsCount: number = 0;

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<UserView> | Promise<UserView> | UserView {
    return this.store.dispatch(new FetchUserByUsernameAction(route.paramMap.get('username')))
      .pipe(
        tap(() => this.user = this.store.selectSnapshot(UserInfoState.user)),
        mergeMap(() => this.store.dispatch(new SetFiltersAction({
          author: {id: this.user.id},
          enable: {eq: true}
        } as Where))),
        mergeMap(() => this.store.dispatch(new FetchPostsAction())),
        tap(() => this.posts = this.store.selectSnapshot(PostState.posts)),
        map(() => ({
            user: this.user,
            posts: this.posts,
            count: this.user.posts,
            commentsCount: this.user.comments
          } as UserView)
        )
      );
  }
}
