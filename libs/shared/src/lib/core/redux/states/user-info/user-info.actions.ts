export class FetchTopActiveUsersAction {
  public static readonly type = '[UserInfo] Fetch top active users';
}

export class FetchTopPopularUsersAction {
  public static readonly type = '[UserInfo] Fetch top popular users';
}

export class FetchUsersAction {
  public static readonly type = '[UserInfo] Fetch users';

  constructor(public search: string) {
  }
}
