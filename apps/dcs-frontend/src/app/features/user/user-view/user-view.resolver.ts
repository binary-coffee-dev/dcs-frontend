import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FetchUserByUsernameAction, User, UserInfoState } from '@dcs-libs/shared';

@Injectable()
export class UserViewResolver implements Resolve<User> {

  constructor(private store: Store) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    return this.store.dispatch(new FetchUserByUsernameAction(route.paramMap.get('username')))
      .pipe(map(() => {
        return this.store.selectSnapshot(UserInfoState.user);
      }));
  }
}
