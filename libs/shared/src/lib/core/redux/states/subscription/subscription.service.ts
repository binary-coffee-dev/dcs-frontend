import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Subscription } from '../../models';
import { SUBSCRIBE_MUTATION, UNSUBSCRIBE_MUTATION, VERIFY_SUBSCRIPTION_MUTATION } from '../../../graphql/mutations';
import {UpdateResponseService} from "../../../services/update-response.service";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apollo = inject(Apollo);
  private responseService = inject(UpdateResponseService);


  verifySubscription(token: string): Observable<Subscription | undefined> {
    return this.apollo.mutate<{ verify: Subscription }>({ mutation: VERIFY_SUBSCRIPTION_MUTATION, variables: { token } })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((response) => response.data?.verify));
  }

  subscribe(email: string): Observable<Subscription | undefined> {
    return this.apollo.mutate<{ subscribe: Subscription }>({ mutation: SUBSCRIBE_MUTATION, variables: { email }})
      .pipe(
        map(res => this.responseService.formatResponseObjects(res)),
        map((response) => response.data?.subscribe)
      );
  }

  unsubscribe(unsubscribeToken: string): Observable<Subscription | undefined> {
    return this.apollo.mutate<{ subscribe: Subscription }>({ mutation: UNSUBSCRIBE_MUTATION, variables: { unsubscribeToken }})
      .pipe(
        map(res => this.responseService.formatResponseObjects(res)),
        map((response) => response.data?.unsubscribe)
      );
  }
}
