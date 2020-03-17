import {Comment, CommentError} from '../models';

export interface CommentStateModel {
  comments: Comment[];
  error: CommentError;
}

export const initCommentStateModel = () => {
  return {
    comments: [],
    error: {message: ''}
  } as CommentStateModel;
};
