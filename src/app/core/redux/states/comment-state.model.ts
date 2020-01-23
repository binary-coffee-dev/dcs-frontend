import {Captcha} from '../models';

export interface CommentStateModel {
  captcha: Captcha;
}

export const initCommentStateModel = () => {
  return {
    captcha: {}
  } as CommentStateModel;
};
