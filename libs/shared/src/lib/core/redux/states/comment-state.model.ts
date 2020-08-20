import { Comment, CommentError } from '../models';

export interface CommentStateModel {
  comments: Comment[];
  recentComments: Comment[];
  error: CommentError;
}

export const initCommentStateModel = () => {
  return {
    comments: [],
    recentComments: [],
    error: {message: ''}
  } as CommentStateModel;
};
