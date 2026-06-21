import { Component, HostListener, inject, signal } from '@angular/core';

import { ScrollService } from '../../../core/services';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss'],
  standalone: false
})
export class ScrollTopComponent {
  private scroll = inject(ScrollService);

  windowScrolled = signal<boolean>(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled.set(true);
    } else if (
      (this.windowScrolled() && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled.set(false);
    }
  }

  scrollToTop() {
    this.scroll.smoothScroll();
  }
}
