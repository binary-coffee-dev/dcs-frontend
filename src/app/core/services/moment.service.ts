import {Injectable} from '@angular/core';

import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {
  }

  timeFromDate(date) {
    return moment(date).fromNow();
  }
}
