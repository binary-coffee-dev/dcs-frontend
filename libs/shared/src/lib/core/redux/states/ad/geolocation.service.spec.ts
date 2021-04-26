import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GEOLocationService } from './geolocation.service';

describe('GEOLocationService', () => {
  let service: GEOLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GEOLocationService]
    });
    service = TestBed.get(GEOLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
