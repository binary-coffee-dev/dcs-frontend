import {File} from './file.model';

export interface Post {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  description: string;
  banner: File;
}
