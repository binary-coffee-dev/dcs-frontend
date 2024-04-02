import { Inject, Injectable } from '@angular/core';

import { Environment, ENVIRONMENT } from '../models';
import { User } from '../redux';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilsService {

  constructor(@Inject(ENVIRONMENT) private environment: Environment) {
  }

  getUserImage(user: User | undefined) {
    return this.normalizeImageUrl(user?.avatarUrl);
  }

  normalizeImageUrl(url: string | undefined, defaultUrl = 'assets/images/noavatar.png') {
    if (!url) {
      return defaultUrl;
    }
    return url.startsWith('http') ? url : new URL(url, this.environment.apiUrl).href;
  }

  normalizeSiteUrl(url: string) {
    return url.startsWith('http') ? url : new URL(url, this.environment.apiUrl).href;
  }
}
