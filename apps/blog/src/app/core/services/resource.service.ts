import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  removeExtraSlashesFromUrl(url: string) {
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  addApiUrl(url: string | undefined) {
    // url = url || '';
    return this.removeExtraSlashesFromUrl(`${environment.apiUrl}${url}`);
  }
}
