import { TestBed } from '@angular/core/testing';

import { MomentService } from './moment.service';

describe('MomentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MomentService = TestBed.inject(MomentService);
    expect(service).toBeTruthy();
  });
});
