import { TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { FetchPostsAction, SetFiltersAction, Where } from '@dcs-libs/shared';
import { PostsGuard } from './posts.guard';

class StoreStub {
  dispatch = jest.fn();
}

describe('PostsGuard', () => {
  let guard: PostsGuard;
  let store: Store;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsGuard,
      {provide: Store, useClass: StoreStub}
    ]
  }));

  beforeEach(() => {
    guard = TestBed.inject(PostsGuard);
    store = TestBed.inject(Store);
  });

  it('should ', (done) => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of({}));

    (guard.canActivate() as Observable<boolean>).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(store.dispatch).toHaveBeenNthCalledWith(1, new SetFiltersAction({enable: true} as Where));
      expect(store.dispatch).toHaveBeenNthCalledWith(2, new FetchPostsAction());
      done();
    });
  });
});
