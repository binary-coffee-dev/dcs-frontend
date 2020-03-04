import {catchError, take, tap} from 'rxjs/operators';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {of} from 'rxjs';

import {AuthStateModel, initAuthStateModel} from './auth-state.model';
import {AuthService} from '../services/auth.service';
import {
  AuthErrorAction,
  LoginAction,
  LoginWithProviderAction,
  LogoutAction,
  MeAction,
  UpdateMeAction,
  UpdateMyAvatarAction
} from '../actions';
import {AuthError, User} from '../models';

@State<AuthStateModel>({
  name: 'auth',
  defaults: initAuthStateModel()
})
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string {
    return state.token;
  }

  @Selector()
  static me(state: AuthStateModel): User {
    return state.me;
  }

  @Selector()
  static authError(state: AuthStateModel): AuthError {
    return state.error;
  }

  constructor(private authService: AuthService) {
  }

  @Action(LoginAction)
  loginAction(ctx: StateContext<AuthStateModel>, action: LoginAction) {
    return this.authService.login(action.identifier, action.password).pipe(
      tap((authData) => ctx.patchState({token: authData.jwt, error: null})),
      catchError(err => {
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
      tap((authData) => ctx.patchState({token: authData.jwt, error: null})),
      take(1)
    );
  }

  @Action(LogoutAction)
  logoutAction(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({token: ''});
  }

  @Action(AuthErrorAction)
  authErrorAction(ctx: StateContext<AuthStateModel>, action: AuthErrorAction) {
    ctx.patchState({error: {id: new Date().getTime(), title: action.title} as AuthError});
  }

  @Action(MeAction)
  meAction(ctx: StateContext<AuthStateModel>) {
    return this.authService.me().pipe(
      tap(me => ctx.patchState({me}))
    );
  }

  @Action(UpdateMeAction)
  updateMeAction(ctx: StateContext<AuthStateModel>, action: UpdateMeAction) {
    return this.authService.updateMeAction(action.id, action.email, action.page).pipe(
      tap(me => ctx.patchState({me}))
    );
  }

  @Action(UpdateMyAvatarAction)
  updateMyAvatarAction(ctx: StateContext<AuthStateModel>, action: UpdateMyAvatarAction) {
    return this.authService.updateMyAvatarAction(action.id, action.avatar).pipe(
      tap(me => ctx.patchState({me}))
    );
  }
}
