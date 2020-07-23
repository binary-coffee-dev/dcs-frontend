import { Post } from './post.model';
import { ResponseData } from '../states/pagination-base.class';

export interface PostConnection extends ResponseData {
  values: Post[];
  aggregate: {
    count: number;
  };
}
