import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';
import { flatMap, map, tap } from 'rxjs/operators';

import { AuthState } from '../redux/states';
import { LogoutAction } from '../redux/states/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '' && !req.headers.has('NO_TOKEN')) {
      authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }
    return next.handle(authReq).pipe(flatMap((res: any) => {
      if (res.body && res.body.errors &&
        res.body.errors.length > 0 &&
        res.body.errors[0].message === 'Invalid token.') {
        return this.store.dispatch(new LogoutAction()).pipe(map(() => {
          this.router.navigate(['/']);
          return res;
        }));
      }
      return of(res);
    }));
  }
}
