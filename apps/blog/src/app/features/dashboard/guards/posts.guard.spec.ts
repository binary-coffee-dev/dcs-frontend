import { TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';
import { firstValueFrom, Observable, of } from 'rxjs';

import { FetchPostsAction, SetFiltersAction, Where } from '@dcs-libs/shared';
import { PostsGuard } from './posts.guard';

class StoreStub {
  dispatch = jest.fn();
}

describe('PostsGuard', () => {
  let guard: PostsGuard;
  let store: StoreStub;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostsGuard,
      {provide: Store, useClass: StoreStub},
    ]
  }));

  beforeEach(() => {
    guard = TestBed.inject(PostsGuard);
    store = TestBed.inject(Store) as unknown as StoreStub;
  });

  it('should call the guard', async () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of({}));

    const result = await firstValueFrom(guard.canActivate() as Observable<boolean>);

    expect(result).toBeTruthy();
    expect(store.dispatch).toHaveBeenNthCalledWith(1, new SetFiltersAction({enable: {eq: true}} as Where));
    expect(store.dispatch).toHaveBeenNthCalledWith(2, new FetchPostsAction());
  });
});
