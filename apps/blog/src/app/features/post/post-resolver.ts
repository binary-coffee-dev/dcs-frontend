import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { isPlatformBrowser } from "@angular/common";

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import {
  AuthState,
  FetchPostAction, FetchPostUserLikeAction,
  FetchSimilarPostsAction,
  Post,
  PostState,
  RecentCommentAction
} from '@dcs-libs/shared';

@Injectable({providedIn: 'root'})
export class PostResolver implements Resolve<Post> {

  isBrowser: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: string,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> | Promise<Post> | Post {
    const user = this.store.selectSnapshot(AuthState.me) || {id: ''};
    return this.store.dispatch(new FetchPostAction(route.paramMap.get('id'), user.id))
      .pipe(
        mergeMap(() => this.store.dispatch(new FetchPostUserLikeAction(route.paramMap.get('id'), user.id))),
        mergeMap(() => this.store.dispatch(new RecentCommentAction())),
        mergeMap(() => {
          // get similar posts only in the browser
          if (this.isBrowser) {
            return this.store.dispatch(new FetchSimilarPostsAction(this.store.selectSnapshot(PostState.post).id));
          }
          return of({});
        }),
        map(() => this.store.selectSnapshot(PostState.post))
      );
  }
}
