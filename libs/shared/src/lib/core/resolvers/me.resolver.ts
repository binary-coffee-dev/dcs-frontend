import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { MeAction } from '../redux/states/auth';

@Injectable()
export class MeResolver implements Resolve<any> {
  private store = inject(Store);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.store.dispatch(new MeAction());
    return true;
  }
}
