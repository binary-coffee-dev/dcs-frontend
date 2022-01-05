import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment, CommentState, Podcast, PodcastState, UrlUtilsService } from '@dcs-libs/shared';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MomentService } from '../../../core/services';

interface ShareLink {
  name: string;
  url: string;
}

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit, OnDestroy {

  @Input() showPodcast = true;
  @Input() showRecentComments = true;
  @Input() showSocialMedias = false;

  _unsubscribe = new Subject();

  podcasts: Podcast[] = [];
  comments: Comment[] = [];
  shareLinks: ShareLink[] = [];

  lineNumbers: number[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService
  ) {
  }

  ngOnInit(): void {
    this.store.select(PodcastState.podcastList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => {
        this.podcasts = list || [];
        this.calculateNumberOfLines();
      });
    this.store.select(CommentState.recentComments)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(comments => {
        this.comments = comments || [];
        this.calculateNumberOfLines();
      });
    this.createShareLinks();
  }

  createShareLinks() {
    const currentUrl = document.location.href;
    this.shareLinks = [
      { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}` } as ShareLink,
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet/?hashtags=BinaryCoffee&url=${currentUrl}`
      } as ShareLink,
      { name: 'Linkedin', url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}` } as ShareLink
    ];
    this.calculateNumberOfLines();
  }

  calculateNumberOfLines() {
    let numberOfLines = 0;
    if (this.showPodcast) {
      numberOfLines += this.podcasts.length * 4 + 5;
    }
    if (this.showSocialMedias) {
      numberOfLines += this.shareLinks.length * 3 + 5;
    }
    if (this.showRecentComments) {
      numberOfLines += this.comments.length * 4 + 4;
    }
    this.lineNumbers = [];
    for (let i = 1; i <= numberOfLines; i++) {
      this.lineNumbers.push(i);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  toDate(date: string): Date {
    return date && new Date(date) || null;
  }
}