import { TestBed } from '@angular/core/testing';

import { UrlUtilsService } from './url-utils.service';

describe('UrlUtilsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UrlUtilsService = TestBed.get(UrlUtilsService);
    expect(service).toBeTruthy();
  });
});
