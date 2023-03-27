import { Component, OnInit, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

import { UrlUtilsService } from '../../core/services';
import { SubscribeDialogComponent } from '../subscribe-dialog';

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

    constructor(private url: UrlUtilsService,
                private dialog: MatDialog) {
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

    openSubscriptionDialog() {
      this.dialog.open(SubscribeDialogComponent, {
        disableClose: true
      });
    }
}
