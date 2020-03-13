import {Inject, Injectable} from '@angular/core';

import {Environment, ENVIRONMENT} from '../models';

@Injectable({
  providedIn: 'root'
})
export class UrlUtilsService {

  constructor(@Inject(ENVIRONMENT) private environment: Environment) {
  }

  getUserImage(user) {
    let defaultAvatarUrl = 'assets/images/noavatar.png';
    if (user && user.avatarUrl) {
      defaultAvatarUrl = user.avatarUrl.startsWith('http')
        ? user.avatarUrl
        : new URL(user.avatarUrl, this.environment.apiUrl).href;
    }
    return defaultAvatarUrl;
  }
}
