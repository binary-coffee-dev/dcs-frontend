import { Injectable, inject } from '@angular/core';

import { Environment, ENVIRONMENT } from '../models';
import { User } from '../redux';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilsService {
  private environment = inject<Environment>(ENVIRONMENT);


  getUserImage(user: User | undefined | null) {
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
