import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { TopUsers, User } from '../../models';
import { COMMENTS_COUNT_QUERY, TOP_ACTIVE_USERS_QUERY, TOP_POPULAR_USERS_QUERY } from '../../../graphql/queries';
import { GET_USERS } from '../../../graphql/queries/users';
import {UpdateResponseService} from "../../../services/update-response.service";

@Injectable()
export class UserInfoService {

  constructor(private apollo: Apollo, private responseService: UpdateResponseService) {
  }

  topActiveUsers(): Observable<TopUsers> {
    return this.apollo.query({query: TOP_ACTIVE_USERS_QUERY, fetchPolicy: 'no-cache'})
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.topActiveUsers));
  }

  topPopularUsers(): Observable<TopUsers> {
    return this.apollo.query({query: TOP_POPULAR_USERS_QUERY, fetchPolicy: 'no-cache'})
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.topPopularUsers));
  }

  getUsers(search: string): Observable<User[]> {
    const filters = search === '' ? {} : {username: {contains: search}};
    return this.apollo.query({query: GET_USERS, variables: {filters}, fetchPolicy: 'no-cache'})
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.users));
  }

  getUserByUsername(username: string | null): Observable<User> {
    return this.apollo.query({query: GET_USERS, variables: {filters: {username: {eq: username}}}, fetchPolicy: 'no-cache'})
      .pipe(
        map(res => this.responseService.formatResponseObjects(res)),
        map((result: any) => {
        if (result.data.users && result.data.users.length > 0) {
          return result.data.users[0];
        }
        return {};
      }));
  }

  getCommentsCount(userId: string): Observable<number> {
    return this.apollo.query({query: COMMENTS_COUNT_QUERY, variables: {user: userId}, fetchPolicy: 'no-cache'})
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.commentsConnection.aggregate.count));
  }
}
