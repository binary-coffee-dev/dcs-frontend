import {Post} from '../models';

export interface PostStateModel {
  posts: Post[];
  post: Post;
  count: number;
}

export const initPostStateModel = () => {
  return {
    posts: [],
  } as PostStateModel;
};
