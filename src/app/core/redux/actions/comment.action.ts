import {Captcha, Comment} from '../models';

export class FetchCaptchaAction {
  static readonly type = '[Comment] Fetch captcha';
}

export class FetchCommentsAction {
  static readonly type = '[Comment] Fetch comments';

  constructor(public postId: string) {
  }
}

export class CreateCommentAction {
  static readonly type = '[Comment] Create comment';

  constructor(public comment: Comment, public captcha: Captcha) {
  }
}

export class CommentErrorAction {
  static readonly type = '[Comment] Comment error';

  constructor(public errorMessage: string) {
  }
}
