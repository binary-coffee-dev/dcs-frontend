import { TestBed, waitForAsync } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PodcastService } from '@dcs-libs/shared';
import { PodcastState } from './podcast.state';

class PodcastServiceStub {
}

describe('PodcastModel store', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PodcastState])],
      providers: [{provide: PodcastService, useClass: PodcastServiceStub}]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

});
