import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import { MutationResult } from '@apollo/client';

import { Subscription } from '../../models';
import { SUBSCRIBE_MUTATION, VERIFY_SUBSCRIPTION_MUTATION } from '../../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private apollo: Apollo) {
  }

  verifySubscription(token: string): Observable<Subscription | undefined> {
    return this.apollo.mutate<{ verify: Subscription }>({ mutation: VERIFY_SUBSCRIPTION_MUTATION, variables: { token } })
      .pipe(map((response) => response.data?.verify));
  }

  subscribe(email: string): Observable<Subscription | undefined> {
    return this.apollo.mutate<{ subscribe: Subscription }>({ mutation: SUBSCRIBE_MUTATION, variables: { email }})
      .pipe(map((response) => response.data?.subscribe));
  }
}
