import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() {
  }

  addApiUrl(url: string) {
    return `${environment.apiUrl}${url}`;
  }
}
