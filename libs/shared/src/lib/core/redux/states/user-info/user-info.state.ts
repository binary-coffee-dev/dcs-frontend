import { State, Action, Selector, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { FetchTopActiveUsersAction, FetchTopPopularUsersAction, FetchUsersAction } from './user-info.actions';
import { initUserInfoStateModel, UserInfoStateModel } from './user-info-state.model';
import { UserInfoService } from './user-info.service';
import { TopUsers, User } from '../../models';

@State<UserInfoStateModel>({
  name: 'userInfo',
  defaults: initUserInfoStateModel()
})
export class UserInfoState {

  constructor(private userInfoService: UserInfoService) {
  }

  @Selector()
  public static topActiveUsers(state: UserInfoStateModel): TopUsers {
    return state.topActiveUsers;
  }

  @Selector()
  public static topPopularUsers(state: UserInfoStateModel): TopUsers {
    return state.topPopularUsers;
  }

  @Selector()
  public static users(state: UserInfoStateModel): User[] {
    return state.users;
  }

  @Action(FetchTopActiveUsersAction)
  public fetchTopActiveUsersAction(ctx: StateContext<UserInfoStateModel>) {
    return this.userInfoService.topActiveUsers()
      .pipe(tap((topActiveUsers) => ctx.patchState({topActiveUsers})));
  }

  @Action(FetchTopPopularUsersAction)
  public fetchTopPopularUsersAction(ctx: StateContext<UserInfoStateModel>) {
    return this.userInfoService.topPopularUsers()
      .pipe(tap((topPopularUsers) => ctx.patchState({topPopularUsers})));
  }

  @Action(FetchUsersAction)
  public fetchUsersAction(ctx: StateContext<UserInfoStateModel>, action: FetchUsersAction) {
    return this.userInfoService.getUsers(action.search)
      .pipe(tap((users) => ctx.patchState({users})));
  }
}
