import { Injectable } from '@angular/core';

import { catchError, map, take, tap } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { of } from 'rxjs';

import { AuthStateModel, initAuthStateModel } from './auth-state.model';
import { AuthService } from './auth.service';
import {
  AuthErrorAction,
  LoginAction,
  LoginWithProviderAction,
  LogoutAction,
  MeAction,
  UpdateMeAction,
  UpdateMyAvatarAction
} from './auth.action';
import { AuthError, User } from '../../models';
import { LoginResponseModel } from '../../models/login-response.model';
import { RoleEnum } from '../../../permissions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: initAuthStateModel()
})
@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static me(state: AuthStateModel): User | undefined {
    return state.me;
  }

  @Selector()
  static isLogin(state: AuthStateModel): boolean {
    return state.token !== '';
  }

  @Selector()
  static role(state: AuthStateModel): RoleEnum | undefined {
    return state.me && state.me.role && state.me.role.type;
  }

  @Selector()
  static authError(state: AuthStateModel): AuthError | undefined {
    return state.error;
  }

  constructor(private authService: AuthService) {
  }

  @Action(LoginAction)
  loginAction(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return this.authService.login(action.identifier, action.password).pipe(
      tap((authData: LoginResponseModel) => ctx.patchState({token: authData.jwt, error: undefined})),
      catchError(() => {
        ctx.patchState({
          error: {id: new Date().getTime(), title: 'Invalid credentials'} as AuthError
        });
        return of({});
      })
    );
  }

  @Action(LoginWithProviderAction)
  loginWithProviderAction(ctx: StateContext<AuthStateModel>, action: LoginWithProviderAction) {
    return this.authService.loginWithProvider(action.provider, action.code).pipe(
      map((jwt: string) => {
        ctx.patchState({token: jwt, error: undefined});
        return (jwt || '') !== '';
      }),
      catchError(() => {
        ctx.patchState({
          error: {id: new Date().getTime(), title: 'Error con el provider'} as AuthError
        });
        return of(false);
      })
    );
  }

  @Action(LogoutAction)
  logoutAction(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({token: '', me: {} as User, error: undefined});
  }

  @Action(AuthErrorAction)
  authErrorAction(ctx: StateContext<AuthStateModel>, action: AuthErrorAction) {
    ctx.patchState({error: {id: new Date().getTime(), title: action.title} as AuthError});
  }

  @Action(MeAction)
  meAction(ctx: StateContext<AuthStateModel>) {
    if (ctx.getState().token !== '') {
      return this.authService.me().pipe(
        tap((me: User) => ctx.patchState({me})),
        take(1)
      );
    }
    return of(false);
  }

  @Action(UpdateMeAction)
  updateMeAction(ctx: StateContext<AuthStateModel>, action: UpdateMeAction) {
    return this.authService.updateMeAction({id: action.id, page: action.page}).pipe(
      tap(() => ctx.dispatch(new MeAction()))
    );
  }

  @Action(UpdateMyAvatarAction)
  updateMyAvatarAction(ctx: StateContext<AuthStateModel>, action: UpdateMyAvatarAction) {
    return this.authService.updateMyAvatarAction(action.id, action.avatar).pipe(
      tap(() => ctx.dispatch(new MeAction()))
    );
  }
}
