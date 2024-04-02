import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { WINDOW } from '@dcs-libs/shared';

@Component({
  selector: 'app-share-buttons',
  templateUrl: './share-buttons.component.html',
  styleUrls: ['./share-buttons.component.scss']
})
export class ShareButtonsComponent implements OnInit {

  url = '';
  urlFacebook = '';
  urlTwitter = '';
  urlLinkedIn = '';
  info = '';

  constructor(@Inject(WINDOW) private window: Window,
              @Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.url = document.location.href;
      this.urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
      this.urlTwitter = `https://twitter.com/intent/tweet/?hashtags=BinaryCoffee&url=${this.url}`;
      this.urlLinkedIn = `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`;
    }
  }
}
