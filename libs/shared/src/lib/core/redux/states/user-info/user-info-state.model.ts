import { TopUsers, User } from '../../models';

export interface UserInfoStateModel {
  topActiveUsers: TopUsers;
  topPopularUsers: TopUsers;
  users: User[];
  user: User;
}

export const initUserInfoStateModel = () => {
  return {
    topActiveUsers: {},
    topPopularUsers: {},
    users: [],
    user: {}
  } as UserInfoStateModel;
};
