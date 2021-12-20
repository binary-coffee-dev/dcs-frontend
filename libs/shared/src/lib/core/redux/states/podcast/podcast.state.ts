import { Injectable } from '@angular/core';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { FetchPodcastAction } from './podcast.actions';
import { Podcast } from '../../models';
import { PodcastService } from './podcast.service';

export interface PodcastStateModel {
  items: Podcast[];
}

@State<PodcastStateModel>({
  name: 'podcast',
  defaults: {
    items: []
  }
})
@Injectable()
export class PodcastState {

  @Selector()
  public static podcastList(state: PodcastStateModel): Podcast[] {
    return state.items;
  }

  constructor(private podcastService: PodcastService) {
  }

  @Action(FetchPodcastAction)
  public fetchPodcast(ctx: StateContext<PodcastStateModel>) {
    return this.podcastService.fetchPodcasts().pipe(
      tap((items: Podcast[]) => ctx.patchState({items})),
      catchError((err) => {
        console.error(err);
        return of(true);
      })
    );
  }
}
