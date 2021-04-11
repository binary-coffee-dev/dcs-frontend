export class LoginAction {
  static readonly type = '[Auth] Login action';

  constructor(public identifier: string, public password: string) {
  }
}

export class LoginWithProviderAction {
  static readonly type = '[Auth] Login with provider action';

  constructor(public provider: string, public code: string) {
  }
}

export class LogoutAction {
  static readonly type = '[Auth] Logout action';
}

export class MeAction {
  static readonly type = '[Auth] get my data action';
}

export class AuthErrorAction {
  static readonly type = '[Auth] Auth error action';

  constructor(public title: string) {
  }
}

export class UpdateMeAction {
  static readonly type = '[Auth] Update me action';

  constructor(public id: string, public page: string) {
  }
}

export class UpdateMyAvatarAction {
  static readonly type = '[Auth] Update my image action';

  constructor(public id: string, public avatar: string) {
  }
}
