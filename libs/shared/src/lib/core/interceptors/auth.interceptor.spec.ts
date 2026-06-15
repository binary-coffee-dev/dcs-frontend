import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import {
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Store } from '@ngxs/store';
import { of, throwError } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { LogoutAction } from '../redux/states';

class StoreStub {
  selectSnapshot = jest.fn();
  dispatch = jest.fn();
}

class RouterStub {
  navigate = jest.fn();
}

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let store: StoreStub;
  let router: RouterStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: Store, useClass: StoreStub },
        { provide: Router, useClass: RouterStub },
      ],
    });

    interceptor = TestBed.inject(AuthInterceptor);
    store = TestBed.inject(Store) as unknown as StoreStub;
    router = TestBed.inject(Router) as unknown as RouterStub;
    jest.clearAllMocks();
  });

  it('should create an instance', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should attach the bearer token when present', (done) => {
    store.selectSnapshot.mockReturnValue('my-token');
    const request = new HttpRequest('GET', '/api/posts');
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };

    interceptor.intercept(request, next).subscribe({
      next: () => {
        const handledRequest = (next.handle as jest.Mock).mock.calls[0][0] as HttpRequest<any>;

        expect(handledRequest.headers.get('Authorization')).toBe('Bearer my-token');
        expect(handledRequest.headers.has('no_token')).toBe(false);
        done();
      },
      error: done,
    });
  });

  it('should not attach the token when the no_token header is present', (done) => {
    store.selectSnapshot.mockReturnValue('my-token');
    const request = new HttpRequest('GET', '/api/posts', {
      headers: undefined,
    }).clone({ setHeaders: { no_token: '1' } });
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(of(new HttpResponse({ status: 200 }))),
    };

    interceptor.intercept(request, next).subscribe({
      next: () => {
        const handledRequest = (next.handle as jest.Mock).mock.calls[0][0] as HttpRequest<any>;

        expect(handledRequest.headers.has('Authorization')).toBe(false);
        expect(handledRequest.headers.get('no_token')).toBe('1');
        done();
      },
      error: done,
    });
  });

  it('should logout and redirect home when the backend returns 401', (done) => {
    store.selectSnapshot.mockReturnValue('my-token');
    store.dispatch.mockReturnValue(of(void 0));
    const request = new HttpRequest('GET', '/api/posts');
    const errorResponse = {
      error: {
        error: {
          status: 401,
        },
      },
    };
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(throwError(() => errorResponse)),
    };

    interceptor.intercept(request, next).subscribe({
      next: (value) => {
        expect(store.dispatch).toHaveBeenCalledWith(new LogoutAction());
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        expect(value).toBe(errorResponse);
        done();
      },
      error: done,
    });
  });

  it('should rethrow non-401 errors', (done) => {
    store.selectSnapshot.mockReturnValue('my-token');
    const request = new HttpRequest('GET', '/api/posts');
    const errorResponse = {
      error: {
        error: {
          status: 500,
        },
      },
    };
    const next: HttpHandler = {
      handle: jest.fn().mockReturnValue(throwError(() => errorResponse)),
    };

    interceptor.intercept(request, next).subscribe({
      next: () => done(new Error('Expected an error to be thrown')),
      error: (error) => {
        expect(error).toBe(errorResponse);
        expect(store.dispatch).not.toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
        done();
      },
    });
  });
});
