import { Subscription } from '../../models';

export interface SubscriptionStateModel {
  subscription?: Subscription;
  loading: boolean;
}

export const initSubscriptionStateModel = () => {
  return {
    subscription: {} as unknown as Subscription,
    loading: false,
  } as SubscriptionStateModel;
};
