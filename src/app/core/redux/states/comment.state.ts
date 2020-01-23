import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';

import {CommentService} from '../services';
import {CommentStateModel, initCommentStateModel} from './comment-state.model';
import {FetchCaptchaAction} from '../actions';
import {Captcha} from '../models';

@State<CommentStateModel>({
  name: 'comment',
  defaults: initCommentStateModel()
})
export class CommentState {

  @Selector()
  static captcha(state: CommentStateModel): Captcha {
    return state.captcha;
  }

  constructor(private commentService: CommentService) {
  }

  @Action(FetchCaptchaAction)
  fetchCaptchaAction(ctx: StateContext<CommentStateModel>) {
    return this.commentService.fetchCaptcha().pipe(tap(captcha => {
      ctx.patchState({captcha});
    }));
  }
}
