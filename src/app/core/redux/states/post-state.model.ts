import {Post} from '../models';

export interface PostStateModel {
  posts: Post[];
  post: Post;
}

export const initPostStateModel = () => {
  return {
    posts: [],
  } as PostStateModel;
};
