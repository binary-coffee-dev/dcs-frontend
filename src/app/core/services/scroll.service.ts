import {Inject, Injectable} from '@angular/core';
import {WINDOW} from './configs';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  static DECELERATION_RATE = 8;

  constructor(@Inject(WINDOW) private window: Window) {
    this.smoothScroll = this.smoothScroll.bind(this);
  }

  smoothScroll() {
    const currentScroll = this.window.document.documentElement.scrollTop || this.window.document.body.scrollTop;
    if (currentScroll > 0) {
      this.window.scrollTo(0, currentScroll - (currentScroll / ScrollService.DECELERATION_RATE));
      this.window.requestAnimationFrame(this.smoothScroll);
    }
  }
}
