import { Component, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UrlUtilsService } from '../../core/services';
import { SubscribeDialogComponent } from '../subscribe-dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false,
})
export class FooterComponent {
  private url = inject(UrlUtilsService);
  private dialog = inject(MatDialog);

  full = input<boolean>(true);
  socialLinks = input<boolean>(true);

  year = signal<number>(new Date().getFullYear());
  root = signal<string>('bc@dev');
  sitemapUrl = signal<string>(this.url.normalizeSiteUrl('sitemap'));
  getRSSUrl = signal<string>(this.url.normalizeSiteUrl('posts/feed/rss2'));

  openSubscriptionDialog() {
    this.dialog.open(SubscribeDialogComponent, {
      disableClose: true,
    });
  }
}
