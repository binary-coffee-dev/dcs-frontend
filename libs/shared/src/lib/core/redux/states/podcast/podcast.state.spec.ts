import { TestBed, async } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PodcastService } from '@dcs-libs/shared';
import { PodcastState } from './podcast.state';

class PodcastServiceStub {
}

describe('Podcast store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PodcastState])],
      providers: [{provide: PodcastService, useClass: PodcastServiceStub}]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

});
