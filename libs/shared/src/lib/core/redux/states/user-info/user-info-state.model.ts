import { TopUsers } from '../../models';

export interface UserInfoStateModel {
  topActiveUsers: TopUsers;
  topPopularUsers: TopUsers;
}

export const initUserInfoStateModel = () => {
  return {
    topActiveUsers: {},
    topPopularUsers: {}
  } as UserInfoStateModel;
};
