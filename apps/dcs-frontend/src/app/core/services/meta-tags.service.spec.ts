import { TestBed } from '@angular/core/testing';

import { MetaTagsService } from './meta-tags.service';

describe('MetaTagsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MetaTagsService = TestBed.get(MetaTagsService);
    expect(service).toBeTruthy();
  });
});
