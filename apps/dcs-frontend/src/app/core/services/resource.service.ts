import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() {
  }

  removeExtraSlashesFromUrl(url: string) {
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  addApiUrl(url: string) {
    return this.removeExtraSlashesFromUrl(`${environment.apiUrl}${url}`);
  }
}
