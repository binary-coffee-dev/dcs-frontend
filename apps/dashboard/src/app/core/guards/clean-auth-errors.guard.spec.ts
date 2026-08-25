import { TestBed, inject } from '@angular/core/testing';
import { firstValueFrom, of, Observable } from 'rxjs';

import { Store } from '@ngxs/store';

import { AuthErrorAction } from '@dcs-libs/shared';
import { CleanAuthErrorsGuard } from './clean-auth-errors.guard';

class StoreStub {
  dispatch = jest.fn().mockReturnValue(of({}));
}

describe('CleanAuthErrorsGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CleanAuthErrorsGuard,
        { provide: Store, useClass: StoreStub }
      ]
    });
  });

  it('should dispatch an auth error action and return true', inject(
    [CleanAuthErrorsGuard, Store],
    async (guard: CleanAuthErrorsGuard, store: StoreStub) => {
      const result = await firstValueFrom(
        guard.canActivate({} as never, {} as never) as Observable<boolean>
      );

      expect(store.dispatch).toHaveBeenCalledWith(expect.any(AuthErrorAction));
      expect((store.dispatch.mock.calls[0][0] as AuthErrorAction).title).toBeUndefined();
      expect(result).toBe(true);
    }
  ));
});
