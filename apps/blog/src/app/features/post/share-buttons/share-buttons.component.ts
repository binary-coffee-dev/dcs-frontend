import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { WINDOW } from '@dcs-libs/shared';

@Component({
    selector: 'app-share-buttons',
    templateUrl: './share-buttons.component.html',
    styleUrls: ['./share-buttons.component.scss'],
    standalone: false
})
export class ShareButtonsComponent implements OnInit {
  private platformId = inject<Object>(PLATFORM_ID);

  url = '';
  urlFacebook = '';
  urlTwitter = '';
  urlLinkedIn = '';
  info = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.url = document.location.href;
      this.urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${this.url}`;
      this.urlTwitter = `https://twitter.com/intent/tweet/?hashtags=BinaryCoffee&url=${this.url}`;
      this.urlLinkedIn = `https://www.linkedin.com/shareArticle?mini=true&url=${this.url}`;
    }
  }
}
