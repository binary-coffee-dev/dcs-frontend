import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Podcast } from '../models';
import { Environment, ENVIRONMENT } from '../../models';

@Injectable()
export class PodcastService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
  }

  fetchPodcasts(): Observable<Podcast[]> {
    return this.http.get<Podcast[]>(this.environment.podcastApiUrl);
  }
}
