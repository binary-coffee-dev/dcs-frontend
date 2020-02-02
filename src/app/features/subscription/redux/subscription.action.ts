export class VerifySubscriptionAction {
  static readonly type = '[Subscription] Verify subscription';

  constructor(public token: string) {
  }
}
