import {Post} from '../models';

export interface PostStateModel {
  posts: Post[];
  post: Post;
  count: number;
  page: number;
  pageSize: number;
}

export const initPostStateModel = () => {
  return {
    posts: [],
    page: 0,
    pageSize: 1
  } as PostStateModel;
};
