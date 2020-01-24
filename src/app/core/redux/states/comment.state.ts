import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';

import {CommentService} from '../services';
import {CommentStateModel, initCommentStateModel} from './comment-state.model';
import {CreateCommentAction, FetchCaptchaAction, FetchCommentsAction} from '../actions';
import {Captcha, Comment} from '../models';

@State<CommentStateModel>({
  name: 'comment',
  defaults: initCommentStateModel()
})
export class CommentState {

  @Selector()
  static captcha(state: CommentStateModel): Captcha {
    return state.captcha;
  }

  @Selector()
  static comments(state: CommentStateModel): Comment[] {
    return state.comments;
  }

  constructor(private commentService: CommentService) {
  }

  @Action(FetchCaptchaAction)
  fetchCaptchaAction(ctx: StateContext<CommentStateModel>) {
    return this.commentService.fetchCaptcha().pipe(tap(captcha => {
      ctx.patchState({captcha});
    }));
  }

  @Action(CreateCommentAction)
  createCommentAction(ctx: StateContext<CommentStateModel>, action: CreateCommentAction) {
    return this.commentService.createComment(action.comment, action.captcha);
  }

  @Action(FetchCommentsAction)
  fetchCommentsAction(ctx: StateContext<CommentStateModel>, action: FetchCommentsAction) {
    return this.commentService.fetchComments(action.postId).pipe(tap(comments => ctx.patchState({comments})));
  }
}
