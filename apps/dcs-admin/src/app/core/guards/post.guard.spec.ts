import {TestBed, inject} from '@angular/core/testing';

import {Store} from '@ngxs/store';

import {PostGuard} from './post.guard';

class StoreStub {
}

describe('PostGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostGuard, {provide: Store, useClass: StoreStub}]
    });
  });

  it('should ...', inject([PostGuard], (guard: PostGuard) => {
    expect(guard).toBeTruthy();
  }));
});
