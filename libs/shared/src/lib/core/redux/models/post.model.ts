import {File} from './file.model';
import {User} from './user.model';

export interface Post {
  id: string;
  name: string;
  title: string;
  body: string;
  publishedAt: Date;
  description: string;
  banner: File;
  author: User;
  enable: boolean;
  views: string;
}
