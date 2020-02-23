import {environment} from '../../../environments/environment';

export const normalizeImageUrl = (url: string) => {
  if (!url) {
    return url;
  }
  if (url.startsWith('http')) {
    return url;
  }
  return environment.apiUrl + url;
};
