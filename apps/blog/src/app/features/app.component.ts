import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { ChangePageSizeAction, Environment, ENVIRONMENT } from '@dcs-libs/shared';
import { consoleMessage } from './console.log';
import { MetaTagsService } from '../core/services';

declare let gtag: (property: string, value: string, configs: Object) => {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    private store: Store,
    private metaTags: MetaTagsService,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', this.environment.googleAnalyticsId, {
          page_path: event.urlAfterRedirects
        });
      }
    });
    this.store.dispatch(new ChangePageSizeAction(this.environment.postPageSize));
  }

  ngOnInit(): void {
    console.log(consoleMessage);
    this.metaTags.addLinkTag({
      rel: 'alternate',
      type: 'application/rss+xml',
      title: `RSS Feed for binary-coffee.dev`,
      href: `${this.environment.apiUrl}posts/feed/rss2`
    }, 'rss-id');
  }
}
