import {Captcha, Comment} from '../models';

export class FetchCaptchaAction {
  static readonly type = '[Comment] Fetch captcha';
}

export class FetchCommentsAction {
  static readonly type = '[Comment] Fetch comments';
}

export class CreateCommentAction {
  static readonly type = '[Comment] Create comment';

  constructor(public comment: Comment, public captcha: Captcha) {
  }
}
