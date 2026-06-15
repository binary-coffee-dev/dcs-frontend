import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  input,
  signal,
  computed,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';

import {
  CommentState,
  MomentService,
  PodcastState,
  Post,
  UrlUtilsService,
  WINDOW,
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
export class InfoBarComponent implements OnInit {
  private store = inject(Store);
  private window = inject<Window>(WINDOW);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);

  showPodcast = input<boolean>(true);
  showRecentComments = input<boolean>(true);
  showSocialMedias = input<boolean>(false);

  episodes = toSignal(this.store.select(PodcastState.episodesList), {
    initialValue: [],
  });
  commentsStore = toSignal(this.store.select(CommentState.recentComments), {
    initialValue: [],
  });
  comments = computed(() =>
    this.commentsStore().map((comment, id) => ({ ...comment, id: id + '' }))
  );
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

  isBrowser = true;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  ngOnInit(): void {
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
