import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT, WINDOW } from '@dcs-libs/shared';
import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WINDOW, useValue: {} },
        { provide: ENVIRONMENT, useValue: {} }
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
