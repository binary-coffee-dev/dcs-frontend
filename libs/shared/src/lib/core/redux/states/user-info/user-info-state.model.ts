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
    topActiveUsers: {} as unknown as TopUsers,
    topPopularUsers: {} as unknown as TopUsers,
    users: [],
    user: {} as unknown as User,
    commentsCount: 0
  } as UserInfoStateModel;
};
