import {Injectable} from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {
  }

  timeFromDate(date) {
    if (!date) {
      return 'Sin publicar';
    }
    return moment(date).fromNow();
  }
}
