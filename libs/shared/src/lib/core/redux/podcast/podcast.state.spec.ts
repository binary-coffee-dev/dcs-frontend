import { TestBed, async } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PodcastState, PodcastStateModel } from './podcast.state';
import { PodcastAction } from './podcast.actions';

describe('Podcast store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PodcastState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: PodcastStateModel = {
      items: ['item-1']
    };
    store.dispatch(new PodcastAction('item-1'));
    const actual = store.selectSnapshot(PodcastState.getState);
    expect(actual).toEqual(expected);
  });

});
