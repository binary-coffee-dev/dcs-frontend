import { Injectable } from '@angular/core';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FetchPodcastAction } from './podcast.actions';
import { EpisodeModel, PodcastModel } from '../../models';
import { PodcastService } from './podcast.service';

export interface PodcastStateModel {
  episodes: EpisodeModel[];
}

@State<PodcastStateModel>({
  name: 'podcast',
  defaults: {
    episodes: []
  }
})
@Injectable()
export class PodcastState {

  @Selector()
  public static episodesList(state: PodcastStateModel): EpisodeModel[] {
    return state.episodes;
  }

  constructor(private podcastService: PodcastService) {
  }

  @Action(FetchPodcastAction)
  public fetchPodcast(ctx: StateContext<PodcastStateModel>, action: FetchPodcastAction) {
    return this.podcastService.fetchPodcasts(action.identifier).pipe(
      tap((podcast: PodcastModel) => ctx.patchState({ episodes: podcast.episodes.reverse().slice(0, Math.min(4, podcast.episodes.length)) })),
      catchError((err) => {
        console.error(err);
        return of(true);
      })
    );
  }
}
