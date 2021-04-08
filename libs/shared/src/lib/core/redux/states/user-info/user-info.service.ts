import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { TopUsers, User } from '../../models';
import { TOP_ACTIVE_USERS_QUERY, TOP_POPULAR_USERS_QUERY } from '../../../graphql/queries';
import { GET_USERS } from '../../../graphql/queries/users';

@Injectable()
export class UserInfoService {

  constructor(private apollo: Apollo) {
  }

  topActiveUsers(): Observable<TopUsers> {
    return this.apollo.watchQuery({query: TOP_ACTIVE_USERS_QUERY, fetchPolicy: 'no-cache'})
      .valueChanges
      .pipe(map((result: any) => result.data.topActiveUsers));
  }

  topPopularUsers(): Observable<TopUsers> {
    return this.apollo.watchQuery({query: TOP_POPULAR_USERS_QUERY, fetchPolicy: 'no-cache'})
      .valueChanges
      .pipe(map((result: any) => result.data.topPopularUsers));
  }

  getUsers(search: string): Observable<User[]> {
    const where = search === '' ? {} : {username: search};
    return this.apollo.watchQuery({query: GET_USERS, variables: {where}, fetchPolicy: 'no-cache'})
      .valueChanges
      .pipe(map((result: any) => result.data.users));
  }
}
