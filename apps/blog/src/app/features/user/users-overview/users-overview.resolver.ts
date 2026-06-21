import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchUsersAction } from '@dcs-libs/shared';

@Injectable()
export class UsersOverViewResolver implements Resolve<void> {
  private store = inject(Store);

  resolve(_route: ActivatedRouteSnapshot): Observable<void> | Promise<void> | void {
    return this.store.dispatch(new FetchUsersAction(''));
  }
}
