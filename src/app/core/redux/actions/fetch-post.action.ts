export class FetchPostAction {
  static readonly type = '[Post] Fetch post';

  constructor(public postId: string) {
  }
}
