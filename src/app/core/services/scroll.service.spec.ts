import {TestBed} from '@angular/core/testing';

import {ScrollService} from './scroll.service';
import {WINDOW} from './configs';

const window = {};

describe('ScrollService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: WINDOW, useValue: window}]
  }));

  it('should be created', () => {
    const service: ScrollService = TestBed.get(ScrollService);
    expect(service).toBeTruthy();
  });
});
