import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { Comment, CommentState, Environment, ENVIRONMENT, UrlUtilsService } from '@dcs-libs/shared';

export interface InformationBanner {
  type: 'comment' | 'welcome';
  value?: Comment;
}

const TIME_TO_CHANGE_PAGE = 6000;

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject<void>();
  stopTimer = new Subject<void>();

  info: InformationBanner[] = [];

  activeInfo: InformationBanner;
  activePage = 0;

  constructor(
    private store: Store,
    public url: UrlUtilsService,
    @Inject(ENVIRONMENT) private environment: Environment,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  ngOnInit(): void {
    this.info.push({ type: 'welcome' } as InformationBanner);

    this.store.select(CommentState.recentComments)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(comments => {
        if (comments && comments.length > 0) {
          this.info = this.info.filter(v => v.type !== 'comment');
          this.addComment(comments[0]);
          this.addComment(comments[1]);
        }
      });

    this.activePage = 0;
    this.updateInfo();

    if (isPlatformBrowser(this.platformId)) {
      this.nextPageTimer();
      // this.setWavePath();
    }
  }

  /**
   * This code is used to paint the initial wave form in the banner
   */
  setWavePath() {
    let wave = '100% 0%, 0% 0%';
    for (let i = 0; i <= 100; i++) {
      const y = this.map(Math.cos(Math.PI * 1.5 * i / 100 - 1), -1, 1, 5, 99);
      wave += `,${i}% ${Math.round((100 - y) * 100) / 100}%`;
    }
    document.documentElement.style.setProperty('--path', wave);
  }

  map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  addComment(comment: Comment) {
    this.info.push({ type: 'comment', value: comment } as InformationBanner);
  }

  openInfo(page) {
    this.stopTimer.next();
    this.activePage = page;
    this.updateInfo();
    this.nextPageTimer();
  }

  nextPageTimer() {
    timer(TIME_TO_CHANGE_PAGE)
      .pipe(takeUntil(this.unsubscribe), takeUntil(this.stopTimer))
      .subscribe(() => {
        this.activePage = (this.activePage + 1) % this.info.length;
        this.updateInfo();
        this.nextPageTimer.bind(this)();
      });
  }

  updateInfo() {
    this.activeInfo = this.info[this.activePage];
  }

  getLimitedMessage(message: string) {
    message = message || '';
    return message.substring(0, Math.min(70, message.length)) + '...';
  }

  getCreateArticleUrl(): string {
    return `${this.environment.siteDashboardUrl}/articles/create`;
  }
}
