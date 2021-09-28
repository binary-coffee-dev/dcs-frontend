import { TestBed, waitForAsync } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { UserInfoState } from './user-info.state';
import { UserInfoService } from './user-info.service';

class UserInfoServiceStub {
}

describe('UserInfo store', () => {
  let store: Store;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{provide: UserInfoService, useClass: UserInfoServiceStub}],
      imports: [NgxsModule.forRoot([UserInfoState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(store).toBeTruthy();
  });

});
