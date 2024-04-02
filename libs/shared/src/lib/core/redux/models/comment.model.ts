import { User } from './user.model';
import { Post } from './post.model';

export interface Comment {
  id: string;
  body: string;
  email?: string;
  name?: string;
  user?: User;
  post?: Post | string;
  createdAt?: Date | string;
}
