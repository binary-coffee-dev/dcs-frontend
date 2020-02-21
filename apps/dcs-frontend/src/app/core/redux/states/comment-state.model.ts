import {Captcha, Comment, CommentError} from '../models';

export interface CommentStateModel {
  captcha: Captcha;
  comments: Comment[];
  error: CommentError;
}

export const initCommentStateModel = () => {
  return {
    captcha: {},
    comments: [],
    error: {message: ''}
  } as CommentStateModel;
};
