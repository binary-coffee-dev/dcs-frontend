import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

import {WINDOW} from './configs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  static DECELERATION_RATE = 8;

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.smoothScroll = this.smoothScroll.bind(this);
  }

  smoothScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const currentScroll = this.window.document.documentElement.scrollTop || this.window.document.body.scrollTop;
      if (currentScroll > 0) {
        this.window.scrollTo(0, currentScroll - (currentScroll / ScrollService.DECELERATION_RATE));
        this.window.requestAnimationFrame(this.smoothScroll);
      }
    }
  }
}
