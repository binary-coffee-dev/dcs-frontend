import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {WINDOW} from '@dcs-libs/shared';

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
      this.window.scrollTo(0, 0);
    }
  }
}
