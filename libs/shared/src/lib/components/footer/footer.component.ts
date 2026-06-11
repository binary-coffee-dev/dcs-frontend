import { Component, OnInit, Input, inject } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { UrlUtilsService } from '../../core/services';
import { SubscribeDialogComponent } from '../subscribe-dialog';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit {
    private url = inject(UrlUtilsService);
    private dialog = inject(MatDialog);

    year: number = 0;
    root: string = '';

    @Input()
    full = true;

    @Input()
    socialLinks = true;

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
