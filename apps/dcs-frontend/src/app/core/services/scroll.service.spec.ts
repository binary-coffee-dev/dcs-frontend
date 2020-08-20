import { TestBed } from '@angular/core/testing';

import { ScrollService } from './scroll.service';
import { WINDOW } from '@dcs-libs/shared';

const EXAMPLE_SCROLL_TOP = 23;

const window = {
  document: {
    documentElement: {scrollTop: EXAMPLE_SCROLL_TOP},
    body: {scrollTop: EXAMPLE_SCROLL_TOP}
  },
  scrollTo: jest.fn(),
  requestAnimationFrame: jest.fn()
};

describe('ScrollService', () => {
  let service: ScrollService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{provide: WINDOW, useValue: window}]
    })
  );

  beforeEach(() => {
    service = TestBed.get(ScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should scroll to the top', () => {
    service.smoothScroll();
    expect(window.scrollTo).toHaveBeenCalled();
  });
});
