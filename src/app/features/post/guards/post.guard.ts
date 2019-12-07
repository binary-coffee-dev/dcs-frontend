import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
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
    this.store.dispatch(new FetchPostAction((route.paramMap.get('id')))).subscribe(() => {});
    return true;
  }
}
