import { Component, OnDestroy, OnInit } from '@angular/core';

import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { FetchPodcastAction, Podcast, PodcastState } from '@dcs-libs/shared';
import { MomentService } from '../../../core/services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-espacio-binario',
  templateUrl: './espacio-binario.component.html',
  styleUrls: ['./espacio-binario.component.scss']
})
export class EspacioBinarioComponent implements OnInit, OnDestroy {

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

}
