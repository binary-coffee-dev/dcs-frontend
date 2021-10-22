import { Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngxs/store';
import { timer } from 'rxjs';
import { MetaTagsService } from '../core/services';

import {
  AuthState,
  ChangePageSizeAction,
  ConfigState,
  Environment,
  ENVIRONMENT,
  SetConfigAction
} from '@dcs-libs/shared';
import { consoleMessage } from './console.log';
import { SubscribeDialogComponent } from '../../../../../libs/shared/src/lib/components/subscribe-dialog';

declare let gtag: (property: string, value: string, configs: Object) => {};

// 30 seconds
const TIME_TO_OPEN_SUBSCRIPTION_DIALOG_IN_MIL = 30000;

const SUBSCRIPTION_WAS_OPENED_CONFIG_KEY = 'SUBSCRIPTION_WAS_OPENED_CONFIG_KEY';

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
    private dialog: MatDialog,
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
    this.showSubscriptionDialog();
  }

  showSubscriptionDialog() {
    if (this.canOpenSubscription()) {
      timer(TIME_TO_OPEN_SUBSCRIPTION_DIALOG_IN_MIL).subscribe(() => {
        this.dialog.open(SubscribeDialogComponent, {
          disableClose: true
        }).afterClosed()
          .subscribe(() => {
            this.store.dispatch(new SetConfigAction(SUBSCRIPTION_WAS_OPENED_CONFIG_KEY, new Date()));
          });
      });
    }
  }

  canOpenSubscription(): boolean {
    return !this.isSessionOpen() && !this.dialogWasShown();
  }

  isSessionOpen(): boolean {
    return this.store.selectSnapshot(AuthState.isLogin);
  }

  dialogWasShown(): boolean {
    const lastOpenDate = this.store.selectSnapshot(ConfigState.getConfigItem(SUBSCRIPTION_WAS_OPENED_CONFIG_KEY));
    try {
      const date = new Date(lastOpenDate);
      return date.getDate() === (new Date()).getDate();
    } catch (ignore) {
    }
    return false;
  }
}
