import {AuthError, User} from '../models';

export interface AuthStateModel {
  token: string;
  me: User;
  error: AuthError;
}

export const initAuthStateModel = () => {
  return {
    token: '',
    me: {},
    error: null
  } as AuthStateModel;
};
