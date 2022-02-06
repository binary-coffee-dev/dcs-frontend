import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Podcast } from '../../models';
import { Environment, ENVIRONMENT } from '../../../models';

@Injectable()
export class PodcastService {
  constructor(
    private http: HttpClient,
    @Inject(ENVIRONMENT) private environment: Environment
  ) {
  }

  fetchPodcasts(): Observable<Podcast[]> {
    // const v = {
    //   url: 'http://localhost',
    //   date: '2021-06-26T20:00:00.000Z',
    //   banner: '',
    //   duration: 200,
    //   id: 'asdfasdf',
    //   name: 'Episodio 0: ¿Quiénes somos?'
    // } as Podcast;
    // return of([v, v, v, v]);
    return this.http.get<Podcast[]>(this.environment.podcastApiUrl);
  }
}
