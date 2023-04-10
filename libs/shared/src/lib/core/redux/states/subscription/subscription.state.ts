import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { map, tap } from 'rxjs/operators';

import { SubscribeAction, VerifySubscriptionAction } from './subscription.action';
import { initSubscriptionStateModel, SubscriptionStateModel } from './subscription-state.model';
import { SubscriptionService } from './subscription.service';
import { Subscription } from '../../models';

@State<SubscriptionStateModel>({
  name: 'subscription',
  defaults: initSubscriptionStateModel()
})
@Injectable()
export class SubscriptionState {

  @Selector()
  static subscription(state: SubscriptionStateModel): Subscription | undefined {
    return state.subscription;
  }

  constructor(private subscriptionService: SubscriptionService) {
  }

  @Action(VerifySubscriptionAction)
  verifySubscriptionAction(ctx: StateContext<SubscriptionStateModel>, action: VerifySubscriptionAction) {
    return this.subscriptionService.verifySubscription(action.token)
      .pipe(tap((subscription) => ctx.patchState({subscription})));
  }

  @Action(SubscribeAction)
  subscribeAction(ctx: StateContext<SubscriptionStateModel>, action: SubscribeAction) {
    return this.subscriptionService.subscribe(action.email)
      .pipe(tap((subscription) => ctx.patchState({subscription})));
  }
}
