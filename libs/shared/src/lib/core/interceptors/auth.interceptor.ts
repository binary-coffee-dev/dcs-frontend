import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { mergeMap, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthState } from '../redux/states';
import { LogoutAction } from '../redux/states/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  keysReplacement = [
    ['published_at', 'publishedAt'],
    ['created_at', 'createdAt'],
    ['updated_at', 'updatedAt'],
  ];

  constructor(private store: Store, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '' && !req.headers.has('no_token')) {
      authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }
    return next.handle(authReq).pipe(mergeMap((res: any) => {
      if (res.body && res.body.errors &&
        res.body.errors.length > 0 &&
        res.body.errors[0].message === 'Invalid token.') {
        return this.store.dispatch(new LogoutAction()).pipe(map(() => {
          this.router.navigate(['/']);
          return res;
        }));
      }
      this.replaceDatesKeysInResponse(res.body);
      return of(res);
    }));
  }

  replaceDatesKeysInResponse(res: any) {
    if (!res || typeof res === 'boolean' || typeof res === 'number' ||
      typeof res === 'string' || typeof res === 'undefined' || typeof res === 'function'){
      return;
    }
    for (let keys of this.keysReplacement) {
      if (res[keys[0]] !== undefined) {
        res[keys[1]] = res[keys[0]];
      }
    }
    Object.keys(res)
      .forEach(sub => this.replaceDatesKeysInResponse(res[sub]));
  }
}
