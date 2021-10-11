import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { SubscribeAction, VerifySubscriptionAction } from './subscription.action';
import { initSubscriptionStateModel, SubscriptionStateModel } from './subscription-state.model';
import { SubscriptionService } from './services/subscription.service';
import { Subscription } from './models';
import { Injectable } from '@angular/core';

@State<SubscriptionStateModel>({
  name: 'subscription',
  defaults: initSubscriptionStateModel()
})
@Injectable()
export class SubscriptionState {

  @Selector()
  static subscription(state: SubscriptionStateModel): Subscription {
    return state.subscription;
  }

  constructor(private subscriptionService: SubscriptionService) {
  }

  @Action(VerifySubscriptionAction)
  verifySubscriptionAction(ctx: StateContext<SubscriptionStateModel>, action: VerifySubscriptionAction) {
    return this.subscriptionService.verifySubscription(action.token)
      .pipe(tap((subscription: Subscription) => ctx.patchState({subscription})));
  }

  @Action(SubscribeAction)
  subscribeAction(ctx: StateContext<SubscriptionStateModel>, action: SubscribeAction) {
    return this.subscriptionService.subscribe(action.email)
      .pipe(tap((subscription: Subscription) => ctx.patchState({subscription})));
  }
}
