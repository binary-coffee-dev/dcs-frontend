import { Component, OnInit, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { FetchPodcastAction, MomentService, PodcastState } from '@dcs-libs/shared';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
  standalone: false
})
export class PodcastComponent implements OnInit {
  private store = inject(Store);
  moment = inject(MomentService);

  podcastName = signal<string>('Espacio Binario');
  episodes = toSignal(this.store.select(PodcastState.episodesList));

  ngOnInit(): void {
    this.store.dispatch(new FetchPodcastAction('espacio-binario'));
  }
}
