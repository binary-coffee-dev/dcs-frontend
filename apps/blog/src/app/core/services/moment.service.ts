import { Injectable } from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {
    moment.locale('es');
  }

  timeFromDate(date) {
    return moment(date).fromNow();
  }

  secondsToDuration(seconds: number): string {
    const milliseconds = seconds * 1000;
    return moment(new Date().getTime() + milliseconds).fromNow().replace('in ', '');
  }
}
