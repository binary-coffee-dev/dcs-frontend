export class FetchPostsAction {
  static readonly type = '[Post] Fetch posts';
}

export class NextPageAction {
  static readonly type = '[Post] Next page';
}

export class PreviousPageAction {
  static readonly type = '[Post] Previous page';
}

export class RefreshPostAction {
  static readonly type = '[Post] Refresh post';
}

export class FetchPostAction {
  static readonly type = '[Post] Fetch post';

  constructor(public postId: string) {
  }
}
