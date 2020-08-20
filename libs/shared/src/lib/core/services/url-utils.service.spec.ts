import { TestBed } from '@angular/core/testing';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { UrlUtilsService } from './url-utils.service';

describe('UrlUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{provide: ENVIRONMENT, useValue: {}}]
  }));

  it('should be created', () => {
    const service: UrlUtilsService = TestBed.get(UrlUtilsService);
    expect(service).toBeTruthy();
  });
});
