import { Component, OnDestroy, OnInit, inject } from '@angular/core';

import { Store } from "@ngxs/store";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { EpisodeModel, FetchPodcastAction, MomentService, PodcastState } from "@dcs-libs/shared";

@Component({
    selector: 'app-podcast',
    templateUrl: './podcast.component.html',
    styleUrls: ['./podcast.component.scss'],
    standalone: false
})
export class PodcastComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  moment = inject(MomentService);

  _unsubscribe = new Subject();

  podcastName = 'Espacio Binario';
  isAdmin = true;
  episodes: EpisodeModel[] = [];

  ngOnInit(): void {
    this.store.dispatch(new FetchPodcastAction('espacio-binario'));
    this.store.select(PodcastState.episodesList)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(list => this.episodes = list || []);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
  }

}
