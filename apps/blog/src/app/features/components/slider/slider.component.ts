import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { Comment, CommentState, UrlUtilsService } from '@dcs-libs/shared';

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
    public url: UrlUtilsService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
  }

  ngOnInit(): void {
    this.info.push({type: 'welcome'} as InformationBanner);

    this.store.select(CommentState.recentComments)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(comments => {
        if (comments && comments.length > 0) {
          this.updateComment(comments[1]);
        }
      });

    this.activePage = 0;
    this.updateInfo();

    this.nextPageTimer();
    // this.setWavePath();
  }

  /**
   * This code is used to paint the initial wave form in the banner
   */
  setWavePath() {
    let wave = '100% 0%, 0% 0%';
    for (let i = 0; i <= 100; i++) {
      const y = this.map(Math.cos(Math.PI * 1.5 * i / 100 - 1), -1, 1, 5, 99);
      wave += `,${i}% ${Math.round((100 - y) *100) / 100}%`;
    }
    document.documentElement.style.setProperty('--path', wave);
  }

  map(value: number, in_min: number, in_max: number, out_min: number, out_max: number): number {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }

  updateComment(comment: Comment) {
    if (!this.info.some(v => v.type === 'comment')) {
      this.info.push({ type: 'comment', value: comment } as InformationBanner);
    } else {
      this.info = this.info.map(inf => {
        if (inf.type === 'comment') {
          return { ...inf, value: comment } as InformationBanner;
        }
        return inf;
      });
    }
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
}
