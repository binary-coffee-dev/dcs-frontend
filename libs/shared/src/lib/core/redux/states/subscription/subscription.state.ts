import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { of } from "rxjs";

import { SubscribeAction, UnsubscribeAction, VerifySubscriptionAction } from './subscription.action';
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

  @Selector()
  static loading(state: SubscriptionStateModel): boolean {
    return state.loading;
  }

  constructor(private subscriptionService: SubscriptionService) {
  }

  @Action(VerifySubscriptionAction)
  verifySubscriptionAction(ctx: StateContext<SubscriptionStateModel>, action: VerifySubscriptionAction) {
    return this.subscriptionService.verifySubscription(action.token)
      .pipe(tap((subscription) => ctx.patchState({subscription})));
  }

  @Action(SubscribeAction)
  subscribeAction({patchState}: StateContext<SubscriptionStateModel>, action: SubscribeAction) {
    patchState({loading: true});
    return this.subscriptionService.subscribe(action.email)
      .pipe(
        tap((subscription) => patchState({subscription, loading: false})),
        catchError(() => {
          patchState({subscription: undefined, loading: false});
          return of({});
        })
      );
  }

  @Action(UnsubscribeAction)
  unsubscribeAction(ctx: StateContext<SubscriptionStateModel>, action: UnsubscribeAction) {
    return this.subscriptionService.unsubscribe(action.unsubscribeToken)
      .pipe(tap((subscription) => ctx.patchState({subscription})));
  }
}
