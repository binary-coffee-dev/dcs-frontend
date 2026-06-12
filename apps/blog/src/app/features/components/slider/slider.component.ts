import {
  Component,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import {
  Comment,
  CommentState,
  Environment,
  ENVIRONMENT,
  Post,
  UrlUtilsService,
} from '@dcs-libs/shared';

export interface InformationBanner {
  type: 'comment' | 'welcome';
  value?: Comment;
}

// toDo (gonzalezext)[25.03.24]: move this to environments
const TIME_TO_CHANGE_PAGE = 6000;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  standalone: false,
})
export class SliderComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  url = inject(UrlUtilsService);
  private environment = inject<Environment>(ENVIRONMENT);
  private platformId = inject<Object>(PLATFORM_ID);

  unsubscribe = new Subject<void>();
  stopTimer = new Subject<void>();

  info = signal<InformationBanner[]>([]);
  createArticleUrl = signal<string>(
    `${this.environment.siteDashboardUrl}/articles/create`
  );
  activeInfo = signal<InformationBanner | null>(null);
  activePage = signal<number>(0);

  getPostName = computed(() => {
    if (
      this.activeInfo()?.value?.post &&
      typeof this.activeInfo()?.value?.post === 'string'
    ) {
      return '';
    }
    return (this.activeInfo()?.value?.post as Post)?.name ?? '';
  });

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  ngOnInit(): void {
    this.info.update((list) => [
      ...list,
      { type: 'welcome' } as InformationBanner,
    ]);

    this.store
      .select(CommentState.recentComments)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((comments) => {
        if (comments && comments.length > 0) {
          this.info.update((list) => [
            ...list.filter((v) => v.type !== 'comment'),
          ]);
          this.addComment(comments[0]);
          this.addComment(comments[1]);
        }
      });

    this.activePage.set(0);
    this.updateInfo();

    if (isPlatformBrowser(this.platformId)) {
      this.nextPageTimer();
    }
  }

  addComment(comment: Comment) {
    this.info.update((list) => [
      ...list,
      { type: 'comment', value: comment } as InformationBanner,
    ]);
  }

  openInfo(page: number) {
    this.stopTimer.next();
    this.activePage.set(page);
    this.updateInfo();
    this.nextPageTimer();
  }

  nextPageTimer() {
    timer(TIME_TO_CHANGE_PAGE)
      .pipe(takeUntil(this.unsubscribe), takeUntil(this.stopTimer))
      .subscribe(() => {
        this.activePage.update(value => (value + 1) % this.info().length);
        this.updateInfo();
        this.nextPageTimer.bind(this)();
      });
  }

  updateInfo() {
    this.activeInfo.set(this.info()[this.activePage()]);
  }

  getLimitedMessage(message: string | undefined) {
    message = message ?? '';
    return message.substring(0, Math.min(70, message.length)) + '...';
  }
}
