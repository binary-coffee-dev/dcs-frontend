import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";

declare let moment: any;

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private platformId = inject(PLATFORM_ID);


  isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  timeFromDate(date: string | Date | undefined): string {
    if (this.isBrowser()) {
      return moment(date).fromNow();
    }
    return '';
  }

  secondsToDuration(seconds: number): string {
    if (this.isBrowser()) {
      const milliseconds = seconds * 1000;
      return moment(new Date().getTime() + milliseconds)
        .fromNow()
        .replace('en ', '')
        .replace('in ', '');
    }
    return '';
  }

  timeFromDateForPublishPost(date: any) {
    if (this.isBrowser()) {
      if (!date) {
        return 'Sin publicar';
      }
      return moment(date).fromNow();
    }
    return '';
  }
}
