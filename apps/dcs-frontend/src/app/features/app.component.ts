import {Component, Inject, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import {Store} from '@ngxs/store';

import {ChangePageSizeAction, Environment, ENVIRONMENT} from '@dcs-libs/shared';
import {consoleMessage} from './console.log';

declare let gtag: (property: string, value: any, configs: any) => {};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public router: Router,
    private store: Store,
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
  }
}
