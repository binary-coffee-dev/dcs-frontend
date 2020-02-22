import {Post} from '../models';
import {StateBase} from './pagination-base.class';

export interface PostStateModel extends StateBase {
  elements: Post[];
  post: Post;
  newPostId: string;
}

export const initPostStateModel = () => {
  return {
    elements: [],
    page: 0,
    pageSize: 10,
    firstPage: false,
    lastPage: false
  } as PostStateModel;
};
