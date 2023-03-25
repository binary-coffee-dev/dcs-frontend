import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';

import { AuthGuard } from './auth.guard';
import { WINDOW } from '@dcs-libs/shared';

class StoreStub {
}

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Store, useClass: StoreStub },
        { provide: WINDOW, useValue: {} }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
