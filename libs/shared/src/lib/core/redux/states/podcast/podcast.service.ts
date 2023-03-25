import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { PodcastModel } from '../../models';
import { PODCAST_BY_IDENTIFIER_QUERY } from '../../../graphql/queries/podcast-by-identifier';

@Injectable()
export class PodcastService {
  constructor(
    private apollo: Apollo
  ) {
  }

  fetchPodcasts(identifier): Observable<PodcastModel> {
    return this.apollo
      .query({ query: PODCAST_BY_IDENTIFIER_QUERY, variables: { identifier }, fetchPolicy: 'no-cache' })
      .pipe(map((result: any) => {
        return result.data.podcastByIdentifier;
      }));
  }
}
