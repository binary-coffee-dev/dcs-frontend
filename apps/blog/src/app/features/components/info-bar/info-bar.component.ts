import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  Comment,
  CommentState,
  EpisodeModel, MomentService,
  PodcastState,
  Post,
  UrlUtilsService,
  WINDOW
} from '@dcs-libs/shared';

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
  isBrowser = true;

  episodes: EpisodeModel[] = [];
  comments: Comment[] = [];
  shareLinks: ShareLink[] = [];

  lineNumbers: number[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.store.select(PodcastState.episodesList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => {
        this.episodes = list || [];
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
    if (this.isBrowser) {
      const currentUrl = this.window.document.location.href;
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
  }

  calculateNumberOfLines() {
    let numberOfLines = 0;
    if (this.showPodcast) {
      numberOfLines += this.episodes.length * 4 + 5;
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
    this._unsubscribe.next(true);
  }

  toDate(date: string | undefined): Date | undefined {
    return date && new Date(date) || undefined;
  }

  getPostName(post: Post | string | undefined) {
    if (!post || typeof post === 'string') {
      return '';
    }
    return post.name;
  }
}
