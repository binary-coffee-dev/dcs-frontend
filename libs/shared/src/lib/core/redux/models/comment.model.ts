import {User} from '@dcs-libs/shared';

export interface Comment {
  body: string;
  email?: string;
  name?: string;
  user?: User;
  post: string;
  publishedAt: Date;
}
