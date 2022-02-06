import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {
  FetchUsersAction
} from '@dcs-libs/shared';

@Injectable()
export class UsersOverViewResolver implements Resolve<void> {

  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<void> | Promise<void> | void {
    return this.store.dispatch(new FetchUsersAction(''));
  }
}
