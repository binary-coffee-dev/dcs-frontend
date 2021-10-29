import { Subscription } from '../../models';

export interface SubscriptionStateModel {
  subscription: Subscription;
}

export const initSubscriptionStateModel = () => {
  return {
    subscription: {},
  } as SubscriptionStateModel;
};
