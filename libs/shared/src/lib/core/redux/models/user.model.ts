import { File } from './file.model';
import { RoleEnum } from '../../permissions';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: File;
  page: string;
  role: Role;
  avatarUrl?: string;
  comments: number;
  posts: number;
}

export interface Role {
  id: string;
  name: string;
  type: RoleEnum;
}
