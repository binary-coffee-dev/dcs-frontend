import {File} from './file.model';

export interface User {
  username: string;
  email: string;
  avatar: File;
  page: string;
}
