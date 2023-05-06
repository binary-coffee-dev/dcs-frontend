import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { PodcastModel } from '../../models';
import { PODCAST_BY_IDENTIFIER_QUERY } from '../../../graphql/queries/podcast-by-identifier';
import {UpdateResponseService} from "../../../services/update-response.service";

@Injectable()
export class PodcastService {
  constructor(
    private apollo: Apollo,
    private responseService: UpdateResponseService
  ) {
  }

  fetchPodcasts(identifier: string): Observable<PodcastModel> {
    return this.apollo
      .query({ query: PODCAST_BY_IDENTIFIER_QUERY, variables: { identifier }, fetchPolicy: 'no-cache' })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => {
        return result.data.podcastByIdentifier;
      }));
  }
}
