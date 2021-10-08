import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { PodcastService } from './podcast.service';

describe('PodcastService', () => {
  let service: PodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PodcastService,
        {provide: ENVIRONMENT, useValue: {}}
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.inject(PodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
