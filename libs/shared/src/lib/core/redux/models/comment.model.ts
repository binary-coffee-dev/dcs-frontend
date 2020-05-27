import {User} from './user.model';
import {Post} from './post.model';

export interface Comment {
  body: string;
  email?: string;
  name?: string;
  user?: User;
  post?: Post;
  publishedAt: Date;
}
