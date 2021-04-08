import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { TopUsers } from '../../models';
import { TOP_ACTIVE_USERS_QUERY, TOP_POPULAR_USERS_QUERY } from '../../../graphql/queries';

@Injectable()
export class UserInfoService {

  constructor(private apollo: Apollo) {
  }

  topActiveUsers(): Observable<TopUsers> {
    return this.apollo
      .mutate({mutation: TOP_ACTIVE_USERS_QUERY})
      .pipe(map((result: any) => result.data.topActiveUsers));
  }

  topPopularUsers(): Observable<TopUsers> {
    return this.apollo
      .mutate({mutation: TOP_POPULAR_USERS_QUERY})
      .pipe(map((result: any) => result.data.topPopularUsers));
  }
}
