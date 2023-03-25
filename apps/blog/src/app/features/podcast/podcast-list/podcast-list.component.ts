import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { EpisodeModel, FetchPodcastAction, PodcastModel, PodcastState } from '@dcs-libs/shared';
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
  episodes: EpisodeModel[] = [];

  constructor(
    private store: Store,
    public moment: MomentService,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new FetchPodcastAction('espacio-binario'));
    this.store.select(PodcastState.episodesList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => this.episodes = list || []);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

}
