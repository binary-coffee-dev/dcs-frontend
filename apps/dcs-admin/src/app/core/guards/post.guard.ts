import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';

import {PostAction} from '../redux/actions';

@Injectable({
  providedIn: 'root'
})
export class PostGuard implements CanActivate {
  constructor(private store: Store) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.dispatch(new PostAction(next.params['id'])).subscribe(() => {
    });
    return true;
  }

}
