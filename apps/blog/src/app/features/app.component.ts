import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';
import { timer } from 'rxjs';

import { MetaTagsService } from '../core/services';
import {
  AuthState,
  ChangePageSizeAction,
  ConfigState,
  Environment,
  ENVIRONMENT,
  SetConfigAction,
  SubscribeDialogComponent
} from '@dcs-libs/shared';
import { consoleMessage } from './console.log';

declare let gtag: (property: string, value: string, configs: object) => {};
declare let moment: any;

// 30 seconds
const TIME_TO_OPEN_SUBSCRIPTION_DIALOG_IN_MIL = 30000;

const SUBSCRIPTION_WAS_OPENED_CONFIG_KEY = 'SUBSCRIPTION_WAS_OPENED_CONFIG_KEY';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent implements OnInit {
  router = inject(Router);
  private store = inject(Store);
  private metaTags = inject(MetaTagsService);
  private dialog = inject(MatDialog);
  private environment = inject<Environment>(ENVIRONMENT);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      moment.locale('es');

      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          gtag('config', this.environment?.googleAnalyticsId || '', {
            page_path: event.urlAfterRedirects
          });
        }
      });
      this.store.dispatch(new ChangePageSizeAction(this.environment?.postPageSize));

      console.log(consoleMessage);

      // toDo 27.01.22, guille, show subscription in new version
      // this.showSubscriptionDialog();
    }
    this.metaTags.addLinkTag(
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `RSS Feed for binary-coffee.dev`,
        href: `${this.environment.apiUrl}posts/feed/rss2`
      },
      'rss-id'
    );
  }

  showSubscriptionDialog() {
    if (this.canOpenSubscription()) {
      timer(TIME_TO_OPEN_SUBSCRIPTION_DIALOG_IN_MIL).subscribe(() => {
        this.dialog
          .open(SubscribeDialogComponent, {
            disableClose: true
          })
          .afterClosed()
          .subscribe(() => {
            this.store.dispatch(
              new SetConfigAction(SUBSCRIPTION_WAS_OPENED_CONFIG_KEY, new Date())
            );
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
    const lastOpenDate = this.store.selectSnapshot(
      ConfigState.getConfigItem(SUBSCRIPTION_WAS_OPENED_CONFIG_KEY)
    );
    try {
      const date = new Date(lastOpenDate);
      return date.getDate() === new Date().getDate();
    } catch (er) {
      console.error(er);
    }
    return false;
  }
}
