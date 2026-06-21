import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { WINDOW } from '@dcs-libs/shared';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private window = inject<Window>(WINDOW);
  private platformId = inject<object>(PLATFORM_ID);

  constructor() {
    this.smoothScroll = this.smoothScroll.bind(this);
  }

  smoothScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.window.scrollTo(0, 0);
    }
  }

  scrollToFragment(fragment: any) {
    const value = this.window.document.getElementById(fragment);
    if (value) {
      value.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }
}
