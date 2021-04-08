import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { UserInfoState, UserInfoStateModel } from './user-info.state';
import { UserInfoAction } from './user-info.actions';

describe('UserInfo store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([UserInfoState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: UserInfoStateModel = {
      items: ['item-1']
    };
    store.dispatch(new UserInfoAction('item-1'));
    const actual = store.selectSnapshot(UserInfoState.getState);
    expect(actual).toEqual(expected);
  });

});
