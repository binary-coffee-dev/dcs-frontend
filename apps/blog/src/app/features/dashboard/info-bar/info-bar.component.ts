import { Component, OnDestroy, OnInit } from '@angular/core';
import { Comment, CommentState, FetchPodcastAction, Podcast, PodcastState, UrlUtilsService } from '@dcs-libs/shared';
import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MomentService } from '../../../core/services';

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit, OnDestroy {

  _unsubscribe = new Subject();

  podcasts: Podcast[] = [];
  comments: Comment[] = [];

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
  }

  calculateNumberOfLines() {
    const numberOfLines = this.podcasts.length * 4 + 5 + this.comments.length * 4 + 4;
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
