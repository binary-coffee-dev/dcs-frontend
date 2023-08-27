import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import {
  AuthState,
  FetchPostAction, FetchPostUserLikeAction,
  FetchSimilarPostsAction,
  Post,
  PostState,
  RecentCommentAction
} from '@dcs-libs/shared';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post> {
  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> | Promise<Post> | Post {
    const user = this.store.selectSnapshot(AuthState.me) || {id: ''};
    return this.store.dispatch(new FetchPostAction(route.paramMap.get('id'), user.id))
      .pipe(
        mergeMap(() => this.store.dispatch(new FetchPostUserLikeAction(route.paramMap.get('id'), user.id))),
        mergeMap(() => this.store.dispatch(new RecentCommentAction())),
        mergeMap( () => {
          return this.store.dispatch(new FetchSimilarPostsAction(this.store.selectSnapshot(PostState.post).id));
        }),
        map(() => this.store.selectSnapshot(PostState.post))
      );
  }
}
