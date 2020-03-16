import {Component, OnInit, Input, Inject} from '@angular/core';

import {Environment, ENVIRONMENT} from '../../core/models';
import {UrlUtilsService} from '../../core/services';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number;
  root: string;

  @Input()
  full = true;

  @Input()
  socialLinks = true;

  constructor(
    private url: UrlUtilsService
  ) {
  }

  ngOnInit() {
    this.root = 'bc@dev:';
    this.year = new Date().getFullYear();
  }

  getSitemapUrl() {
    return this.url.normalizeSiteUrl('sitemap');
  }

  getRSSUrl() {
    return this.url.normalizeSiteUrl('posts/feed/rss2');
  }
}
