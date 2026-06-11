import { Injectable, PLATFORM_ID, inject } from '@angular/core';
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
  private store = inject(Store);


  isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);

    this.isBrowser = isPlatformBrowser(platformId);
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Post> | Promise<Post> | Post {
    const user = this.store.selectSnapshot(AuthState.me) || {id: ''};
    return this.store.dispatch(new FetchPostAction(route.paramMap.get('id'), user.id))
      .pipe(
        mergeMap(() => {
          // get this info only in the browser
          if (this.isBrowser) {
            return [
              this.store.dispatch(new FetchPostUserLikeAction(route.paramMap.get('id'), user.id)),
              this.store.dispatch(new RecentCommentAction()),
              this.store.dispatch(new FetchSimilarPostsAction(this.store.selectSnapshot(PostState.post).id))
            ];
          }
          return of({});
        }),
        map(() => this.store.selectSnapshot(PostState.post))
      );
  }
}
