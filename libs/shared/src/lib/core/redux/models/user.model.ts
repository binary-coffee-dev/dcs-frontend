import {File} from './file.model';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: File;
  page: string;
}
