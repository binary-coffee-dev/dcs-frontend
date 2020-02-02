import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';

import {VerifySubscriptionAction} from './subscription.action';
import {initSubscriptionStateModel, SubscriptionStateModel} from './subscription-state.model';
import {SubscriptionService} from './services/subscription.service';
import {Subscription} from './models';

@State<SubscriptionStateModel>({
  name: 'subscription',
  defaults: initSubscriptionStateModel()
})
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
}
