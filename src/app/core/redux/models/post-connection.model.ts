import {Post} from './post.model';

export interface PostConnection {
  values: Post[];
  aggregate: {
    count: number;
  };
}
