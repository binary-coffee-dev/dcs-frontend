import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { TopUsers, User } from '../../models';
import { COMMENTS_COUNT_QUERY, TOP_ACTIVE_USERS_QUERY, TOP_POPULAR_USERS_QUERY } from '../../../graphql/queries';
import { GET_USERS } from '../../../graphql/queries/users';

@Injectable()
export class UserInfoService {

  constructor(private apollo: Apollo) {
  }

  topActiveUsers(): Observable<TopUsers> {
    return this.apollo.query({query: TOP_ACTIVE_USERS_QUERY, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => result.data.topActiveUsers));
  }

  topPopularUsers(): Observable<TopUsers> {
    return this.apollo.query({query: TOP_POPULAR_USERS_QUERY, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => result.data.topPopularUsers));
  }

  getUsers(search: string): Observable<User[]> {
    const where = search === '' ? {} : {username: search};
    return this.apollo.query({query: GET_USERS, variables: {where}, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => result.data.users2));
  }

  getUserByUsername(username: string | null): Observable<User> {
    return this.apollo.query({query: GET_USERS, variables: {where: {username}}, fetchPolicy: 'no-cache'})
      .pipe(
        map((result: any) => {
        if (result.data.users2 && result.data.users2.length > 0) {
          return result.data.users2[0];
        }
        return {};
      }));
  }

  getCommentsCount(userId: string): Observable<number> {
    return this.apollo.query({query: COMMENTS_COUNT_QUERY, variables: {user: userId}, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => result.data.commentsConnection.aggregate.count));
  }
}
