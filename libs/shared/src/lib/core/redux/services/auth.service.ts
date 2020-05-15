import {Injectable} from '@angular/core';

import {Apollo} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {
  LOGIN_MUTATION,
  LOGIN_WITH_PROVIDER_MUTATION,
  UPDATE_PROFILE_IMAGE_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '../../graphql/mutations';
import {ME_QUERY} from '../../graphql/queries';
import {LoginResponseModel} from '../models/login-response.model';
import {User} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo) {
  }

  login(identifier: string, password: string): Observable<LoginResponseModel> {
    return this.apollo
      .mutate({mutation: LOGIN_MUTATION, variables: {identifier, password}})
      .pipe(map((result: any) => result.data.login));
  }

  loginWithProvider(provider: string, code: string): Observable<string> {
    return this.apollo
      .mutate({mutation: LOGIN_WITH_PROVIDER_MUTATION, variables: {provider, code}})
      .pipe(map((result: any) => result.data.loginWithProvider));
  }

  me(): Observable<User> {
    return this.apollo
      .watchQuery({query: ME_QUERY, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.myData));
  }

  updateMeAction(variables: {id: string, page: string}): Observable<User> {
    return this.apollo
      .mutate({mutation: UPDATE_PROFILE_MUTATION, variables})
      .pipe(map((result: any) => result.data.updateUser.user));
  }

  updateMyAvatarAction(id: string, avatar: string): Observable<User> {
    return this.apollo
      .mutate({mutation: UPDATE_PROFILE_IMAGE_MUTATION, variables: {id, avatar}})
      .pipe(map((result: any) => result.data.updateUser.user));
  }
}
