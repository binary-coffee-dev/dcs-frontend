import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthState } from '../redux/states';
import { LogoutAction } from '../redux/states/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '' && !req.headers.has('no_token')) {
      authReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
    }
    return next.handle(authReq).pipe(catchError((res, caught) => {
      if (res.error && res.error.error && res.error.error.status === 401) {
        return this.store.dispatch(new LogoutAction()).pipe(map(() => {
          this.router.navigate(['/']);
          return res;
        }));
      }
      throw res;
    }));
  }

}
