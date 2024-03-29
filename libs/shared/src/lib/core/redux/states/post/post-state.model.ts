import { Post } from '../../models';
import { StateBase } from '../pagination-base.class';

export interface PostStateModel extends StateBase {
  elements: Post[];
  post: Post;
  similarPosts: Post[];
  newPostId?: string;
  likes: number;
  userLike: number;
  userId: string;
}

export const initPostStateModel = () => {
  return {
    count: 0,
    post: {} as unknown as Post,
    elements: [],
    page: 0,
    pageSize: 10,
    firstPage: false,
    lastPage: false,
    similarPosts: [],
    likes: 0,
    userLike: 0,
    userId: ''
  } as PostStateModel;
};
