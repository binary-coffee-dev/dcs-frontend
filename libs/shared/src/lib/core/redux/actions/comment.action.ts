import {Comment} from '../models';

export class FetchCommentsAction {
  static readonly type = '[Comment] Fetch comments';

  constructor(public postId: string) {
  }
}

export class CreateCommentAction {
  static readonly type = '[Comment] Create comment';

  constructor(public comment: Comment) {
  }
}

export class CommentErrorAction {
  static readonly type = '[Comment] Comment error';

  constructor(public errorMessage: string) {
  }
}
export class RecentCommentAction {
  static readonly type = '[Comment] Fetch recent comment error';
}
