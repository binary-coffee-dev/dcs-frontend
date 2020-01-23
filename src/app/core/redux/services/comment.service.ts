import { Injectable } from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

import {Captcha} from '../models';
import {CAPTCHA_QUERY} from '../../graphql/queries';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apollo: Apollo) { }

  fetchCaptcha(): Observable<Captcha> {
    return this.apollo
      .watchQuery({query: CAPTCHA_QUERY, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.captcha));
  }
}
