import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { Comment, CommentState, UrlUtilsService } from '@dcs-libs/shared';

export interface InformationBanner {
  type: 'comment' | 'welcome';
  value?: Comment;
}

const TIME_TO_CHANGE_PAGE = 3000;

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

    // this.nextPageTimer();
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
    // this.nextPageTimer();
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
