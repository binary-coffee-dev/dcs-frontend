import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UrlUtilsService } from '../../core/services';
import { RemoveFileAction } from '../../core/redux';
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
        data: { title: '¿Está seguro que desea eliminar la imágen?' },
        disableClose: true
      });
    }
}
