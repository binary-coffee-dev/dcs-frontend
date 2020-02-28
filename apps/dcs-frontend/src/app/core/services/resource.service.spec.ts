import {TestBed} from '@angular/core/testing';

import {ResourceService} from './resource.service';

describe('ResourceService', () => {
  let service: ResourceService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ResourceService]
  }));

  beforeEach(() => {
    service = TestBed.get(ResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
