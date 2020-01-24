import {Captcha, Comment} from '../models';

export interface CommentStateModel {
  captcha: Captcha;
  comments: Comment[];
}

export const initCommentStateModel = () => {
  return {
    captcha: {},
    comments: []
  } as CommentStateModel;
};
