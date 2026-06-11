import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
  signal,
  effect, computed,
} from '@angular/core';
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
  styleUrls: ['./info-bar.component.scss'],
  standalone: false,
})
export class InfoBarComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);
  private window = inject<Window>(WINDOW);

  showPodcast = input<boolean>(true);
  showRecentComments = input<boolean>(true);
  showSocialMedias = input<boolean>(false);

  episodes = signal<EpisodeModel[]>([]);
  comments = signal<Comment[]>([]);
  shareLinks = signal<ShareLink[]>([]);

  lineNumbers = computed(() => {
    let numberOfLines = 0;
    if (this.showPodcast()) {
      numberOfLines += this.episodes().length * 4 + 5;
    }
    if (this.showSocialMedias()) {
      numberOfLines += this.shareLinks().length * 3 + 5;
    }
    if (this.showRecentComments()) {
      numberOfLines += this.comments().length * 4 + 4;
    }

    return Object.keys(new Array(numberOfLines).fill(0)).map((i) => +i + 1);
  });

  _unsubscribe = new Subject();
  isBrowser = true;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  ngOnInit(): void {
    this.store
      .select(PodcastState.episodesList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((list) => {
        this.episodes.set(list || []);
      });
    this.store
      .select(CommentState.recentComments)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((comments) => {
        this.comments.set(comments || []);
      });
    this.createShareLinks();
  }

  createShareLinks() {
    if (this.isBrowser) {
      const currentUrl = this.window.document.location.href;
      this.shareLinks.set([
        {
          name: 'Facebook',
          url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        } as ShareLink,
        {
          name: 'Twitter',
          url: `https://twitter.com/intent/tweet/?hashtags=BinaryCoffee&url=${currentUrl}`,
        } as ShareLink,
        {
          name: 'Linkedin',
          url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`,
        } as ShareLink,
      ]);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
  }

  toDate(date: string | undefined): Date | undefined {
    return (date && new Date(date)) || undefined;
  }

  getPostName(post: Post | string | undefined) {
    if (!post || typeof post === 'string') {
      return '';
    }
    return post.name;
  }
}
