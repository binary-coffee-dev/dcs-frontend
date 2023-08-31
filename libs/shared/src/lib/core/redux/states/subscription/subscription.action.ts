export class VerifySubscriptionAction {
  static readonly type = '[Subscription] Verify subscription';

  constructor(public token: string) {
  }
}

export class SubscribeAction {
  static readonly type = '[Subscription] Subscribe';

  constructor(public email: string) {
  }
}

export class UnsubscribeAction {
  static readonly type = '[Subscription] UnsubscribeAction';

  constructor(public unsubscribeToken: string) {
  }
}
