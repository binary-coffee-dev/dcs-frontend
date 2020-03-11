import {TestBed, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {Store} from '@ngxs/store';

import {ProviderGuard} from './provider.guard';
import {WINDOW} from '@dcs-libs/shared';

class StoreStub {
}

describe('ProviderGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProviderGuard,
        {provide: Store, useClass: StoreStub},
        {provide: WINDOW, useValue: {}}
      ]
    });
  });

  it('should ...', inject([ProviderGuard], (guard: ProviderGuard) => {
    expect(guard).toBeTruthy();
  }));
});
