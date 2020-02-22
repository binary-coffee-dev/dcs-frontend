import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';

import {AuthState} from '../redux/states';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.store.selectSnapshot(AuthState.token);
    if (token !== '') {
      authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    }
    return next.handle(authReq);
  }
}
