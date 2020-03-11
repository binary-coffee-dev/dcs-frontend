import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Store} from '@ngxs/store';
import {of} from 'rxjs';

import {FetchPostsAction} from '@dcs-libs/shared';
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

  it('should ', () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of({}));

    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new FetchPostsAction());
  });
});
