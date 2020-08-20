import { AuthError, User } from '../models';

export interface AuthStateModel {
  token: string;
  me: User;
  error: AuthError;
}

export const initAuthStateModel = () => {
  return {
    token: '',
    error: null
  } as AuthStateModel;
};
