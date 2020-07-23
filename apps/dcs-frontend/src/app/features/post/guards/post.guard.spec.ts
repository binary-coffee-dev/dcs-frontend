import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { FetchPostAction } from '@dcs-libs/shared';
import { PostGuard } from './post.guard';

class StoreStub {
  dispatch = jest.fn();
}

const ID_EXAMPLE = '5432';

describe('PostGuard', () => {
  let guard: PostGuard;
  let store: StoreStub;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostGuard,
      {provide: Store, useClass: StoreStub}
    ]
  }));

  beforeEach(() => {
    guard = TestBed.get(PostGuard);
    store = TestBed.get(Store);
  });

  it('should ', () => {
    jest.spyOn(store, 'dispatch').mockReturnValue(of({}));

    expect(guard.canActivate(
      {paramMap: {get: () => ID_EXAMPLE}} as unknown as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot)
    ).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(new FetchPostAction(ID_EXAMPLE));
  });
});
