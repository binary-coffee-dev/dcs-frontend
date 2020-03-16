import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Store} from '@ngxs/store';
import {Observable, of} from 'rxjs';

import {FetchPostsAction, SetFiltersAction} from '@dcs-libs/shared';
import {PostsGuard} from './posts.guard';

class StoreStub {
  dispatch = jest.fn();
}

describe('PostsGuard', () => {
  let guard: PostsGuard;
  let store: StoreStub;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsGuard,
      {provide: Store, useClass: StoreStub}
    ]
  }));

  beforeEach(() => {
    guard = TestBed.get(PostsGuard);
    store = TestBed.get(Store);
  });

  it('should ', (done) => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of({}));

    (guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot) as Observable<boolean>).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(store.dispatch).toHaveBeenNthCalledWith(1, new SetFiltersAction({enable: true}));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, new FetchPostsAction());
      done();
    });
  });
});
