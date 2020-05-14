import {Post, User} from '../models';

export class PostAction {
  static readonly type = '[Post] Fetch post';

  constructor(public postId: string) {
  }
}

export class FetchPostAction {
  static readonly type = '[Post] Fetch post by name';

  constructor(public postName: string) {
  }
}

export class RefreshPostAction {
  static readonly type = '[Post] Refresh current post';
}

export class PostUpdateAction {
  static readonly type = '[Post] Post update';

  constructor(public post: Post) {
  }
}

export class PostCreateAction {
  static readonly type = '[Post] Post create';

  constructor(public post: Post, public me: User) {
  }
}

export class FetchPostsAction {
  static readonly type = '[Post] Fetch posts';
}

export class NextPageAction {
  static readonly type = '[Post] Next page';
}

export class PreviousPageAction {
  static readonly type = '[Post] Previous page';
}

export class SelectPageAction {
  static readonly type = '[Post] Change page';

  constructor(public page: number) {
  }
}

export class ChangePageSizeAction {
  static readonly type = '[Post] Change page size';

  constructor(public pageSize: number) {
  }
}

export class SetFiltersAction {
  static readonly type = '[Post] Set post filters';

  constructor(public where: any) {
  }
}

export class FetchSimilarPostsAction {
  static readonly type = '[Post] Fetch similar posts';

  constructor(public id: string, public limit: number) {
  }
}
