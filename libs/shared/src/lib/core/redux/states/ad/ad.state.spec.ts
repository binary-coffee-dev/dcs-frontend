import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';

import { AdState } from './ad.state';
import { GEOLocationService } from '@dcs-libs/shared';

class GEOLocationServiceStub {
}

describe('AdState', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([AdState])],
      providers: [{provide: GEOLocationService, useClass: GEOLocationServiceStub}]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(store).toBeTruthy();
  });

});
