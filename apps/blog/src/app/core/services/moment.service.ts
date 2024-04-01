import { Injectable } from '@angular/core';

import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() {
    if (moment) {
      moment.locale('es');
    }
  }

  timeFromDate(date: string | Date | undefined): string {
    return moment(date).fromNow();
  }

  secondsToDuration(seconds: number): string {
    const milliseconds = seconds * 1000;
    return moment(new Date().getTime() + milliseconds)
      .fromNow()
      .replace('en ', '')
      .replace('in ', '');
  }
}
