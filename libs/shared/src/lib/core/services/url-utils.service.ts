import {Inject, Injectable} from '@angular/core';

import {Environment, ENVIRONMENT} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilsService {

  constructor(@Inject(ENVIRONMENT) private environment: Environment) {
  }

  getUserImage(user) {
    return this.normalizeImageUrl(user && user.avatarUrl);
  }

  normalizeImageUrl(url, defaultUrl =  'assets/images/noavatar.png') {
    if (!url) {
      return defaultUrl;
    }
    return url.startsWith('http') ? url : new URL(url, this.environment.apiUrl).href;
  }

  normalizeSiteUrl(url) {
    return url.startsWith('http') ? url : new URL(url, this.environment.apiUrl).href;
  }
}
