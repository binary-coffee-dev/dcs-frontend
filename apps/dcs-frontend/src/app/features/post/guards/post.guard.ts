import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngxs/store';

import {FetchPostAction} from '../../../core/redux/actions';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.dispatch(new FetchPostAction(route.paramMap.get('id'))).pipe(map(() => true));
  }
}
