import { TestBed, waitForAsync } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { ConfigState } from './config.state';

describe('Config store', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ConfigState])]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should create an action and add an item', () => {
    expect(store).toBeTruthy();
  });

});
