import {File} from './file.model';
import {User} from './user.model';

export interface Post {
  id: string;
  name: string;
  title: string;
  body: string;
  createdAt: Date;
  description: string;
  banner: File;
  author: User;
}
