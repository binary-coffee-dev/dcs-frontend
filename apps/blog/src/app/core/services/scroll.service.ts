import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.smoothScroll = this.smoothScroll.bind(this);
  }

  smoothScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.window.scrollTo(0, 0);
    }
  }

  scrollToFragment(fragment) {
    const value = this.window.document.getElementById(fragment);
    if (value) {
      value.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'center'});
    }
  }
}
