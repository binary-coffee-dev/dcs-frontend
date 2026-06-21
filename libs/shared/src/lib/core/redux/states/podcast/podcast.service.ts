import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { PodcastModel } from '../../models';
import { PODCAST_BY_IDENTIFIER_QUERY } from '../../../graphql/queries/podcast-by-identifier';
import { UpdateResponseService } from '../../../services/update-response.service';

@Injectable()
export class PodcastService {
  private apollo = inject(Apollo);
  private responseService = inject(UpdateResponseService);

  fetchPodcasts(identifier: string): Observable<PodcastModel> {
    return this.apollo
      .query({
        query: PODCAST_BY_IDENTIFIER_QUERY,
        variables: { identifier },
        fetchPolicy: 'no-cache'
      })
      .pipe(
        map((res) => this.responseService.formatResponseObjects(res)),
        map((result: any) => {
          return result.data.podcastByIdentifier;
        })
      );
  }
}
