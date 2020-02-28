import {Component, HostListener} from '@angular/core';
import {ScrollService} from '../../../core/services';

@Component({
  selector: 'app-scroll-top',
  templateUrl: './scroll-top.component.html',
  styleUrls: ['./scroll-top.component.scss', '../social-links/social-links.component.scss']
})
export class ScrollTopComponent {
  windowScrolled: boolean;

  constructor(private scroll: ScrollService) {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    this.scroll.smoothScroll();
  }
}
