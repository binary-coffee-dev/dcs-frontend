import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

import { SUBSCRIBE_MUTATION, VERIFY_SUBSCRIPTION_MUTATION } from '../../../../core/graphql/mutations';
import { Subscription } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private apollo: Apollo) {
  }

  verifySubscription(token: string): Observable<Subscription> {
    return this.apollo.mutate({mutation: VERIFY_SUBSCRIPTION_MUTATION, variables: {token}})
      .pipe(map((response: {data: {verify: Subscription}}) => response.data.verify));
  }

  subscribe(email: string): Observable<Subscription> {
    return this.apollo.mutate({mutation: SUBSCRIBE_MUTATION, variables: {email}})
      .pipe(map((response: {data: {subscribe: Subscription}}) => response.data.subscribe));
  }
}
