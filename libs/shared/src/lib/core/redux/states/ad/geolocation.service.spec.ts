import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GEOLocationService } from './geolocation.service';
import { Apollo } from 'apollo-angular';

class ApolloStub {
}

describe('GEOLocationService', () => {
  let service: GEOLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GEOLocationService, {provide: Apollo, useClass: ApolloStub}]
    });
    service = TestBed.get(GEOLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
