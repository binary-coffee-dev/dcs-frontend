import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { FetchPodcastAction, Podcast, PodcastState } from '@dcs-libs/shared';
import { MomentService } from '../../../core/services';

@Component({
  selector: 'app-podcast-list',
  templateUrl: './podcast-list.component.html',
  styleUrls: ['./podcast-list.component.scss']
})
export class PodcastListComponent implements OnInit, OnDestroy {

  _unsubscribe = new Subject();

  podcastName: 'Espacio Binario';
  isAdmin: true;
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

}
