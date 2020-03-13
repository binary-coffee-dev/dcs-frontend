import {File} from './file.model';
import {Role} from '../../permissions';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: File;
  page: string;
  role: Role;
  avatarUrl: string;
}
