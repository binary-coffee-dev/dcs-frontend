import {Post} from '../models';

export interface PostStateModel {
  posts: Post[];
  post: Post;
  count: number;
  page: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}

export const initPostStateModel = () => {
  return {
    posts: [],
    page: 0,
    pageSize: 10,
    firstPage: false,
    lastPage: false
  } as PostStateModel;
};
