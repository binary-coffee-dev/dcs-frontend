import {TestBed, inject} from '@angular/core/testing';

import {ProviderGuard} from './provider.guard';
import {Store} from '@ngxs/store';

class StoreStub {
}

describe('ProviderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderGuard, {provide: Store, useClass: StoreStub}]
    });
  });

  it('should ...', inject([ProviderGuard], (guard: ProviderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
