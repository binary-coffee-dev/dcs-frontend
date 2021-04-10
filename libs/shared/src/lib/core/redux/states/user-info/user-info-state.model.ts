import { TopUsers, User } from '../../models';

export interface UserInfoStateModel {
  topActiveUsers: TopUsers;
  topPopularUsers: TopUsers;
  users: User[];
  user: User;
  commentsCount: number;
}

export const initUserInfoStateModel = () => {
  return {
    topActiveUsers: {},
    topPopularUsers: {},
    users: [],
    user: {},
    commentsCount: 0
  } as UserInfoStateModel;
};
