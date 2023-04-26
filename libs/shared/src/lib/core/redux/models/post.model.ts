import { File } from './file.model';
import { User } from './user.model';
import { Tag } from './tag.model';

export interface Post {
  id: string;
  name: string;
  title: string;
  body: string;
  publishedAt?: Date;
  banner?: File;
  author?: User;
  enable: boolean;
  views: string;
  comments: number;
  tags: Tag[];
}
