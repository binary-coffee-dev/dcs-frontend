import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchPostAction, Post, PostState } from '@dcs-libs/shared';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<Post[]> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>|Promise<any>|any {
    return this.store.dispatch(new FetchPostAction(route.paramMap.get('id')))
      .pipe(map(() => {
        return this.store.selectSnapshot(PostState.post);
      }));
  }
}
