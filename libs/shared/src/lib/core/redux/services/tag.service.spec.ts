import { TestBed } from '@angular/core/testing';

import { TagService } from './tag.service';

describe('TagService', () => {
  let service: TagService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [TagService]
  }));

  beforeEach(() => {
    service = TestBed.get(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
