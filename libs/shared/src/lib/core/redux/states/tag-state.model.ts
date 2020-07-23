import { Tag } from '../models';
import { StateBase } from './pagination-base.class';

export interface TagStateModel extends StateBase {
  elements: Tag[];
  post: Tag;
  newPostId: string;
}

export const initTagStateModel = () => {
  return {
    elements: [],
    page: 0,
    pageSize: 10,
    firstPage: false,
    lastPage: false
  } as TagStateModel;
};
