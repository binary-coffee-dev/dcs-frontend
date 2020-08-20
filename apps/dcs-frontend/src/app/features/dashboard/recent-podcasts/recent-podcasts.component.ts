import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { FetchPodcastAction, Podcast, PodcastState } from '@dcs-libs/shared';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MomentService } from '../../../core/services';

@Component({
  selector: 'app-recent-podcasts',
  templateUrl: './recent-podcasts.component.html',
  styleUrls: ['./recent-podcasts.component.scss']
})
export class RecentPodcastsComponent implements OnInit, OnDestroy {

  _unsubscribe = new Subject();

  podcasts: Podcast[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchPodcastAction());
    this.store.select(PodcastState.podcastList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => this.podcasts = list || []);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  toDate(podcast: Podcast): Date {
    return podcast && podcast.date && new Date(podcast.date) || null;
  }
}
