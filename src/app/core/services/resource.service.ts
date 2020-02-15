import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() {
  }

  addApiUrl(url: string) {
    if (url.length > 0 && url[0] === '/')
      url = url.substring(1);
    return `${environment.apiUrl}${url}`;
  }
}
