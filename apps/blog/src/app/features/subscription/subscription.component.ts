import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';

import { SubscriptionState, UnsubscribeAction, VerifySubscriptionAction } from '@dcs-libs/shared';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  standalone: false
})
export class SubscriptionComponent implements OnInit {
  private store = inject(Store);
  private activeRouter = inject(ActivatedRoute);

  message = signal<string>('');

  ngOnInit() {
    this.verifyingEmail(this.activeRouter.snapshot.params['token']);
    this.unsubscribingEmail(this.activeRouter.snapshot.params['unsubscribe_token']);
  }

  verifyingEmail(token: string) {
    if (token) {
      this.executeAction(
        new VerifySubscriptionAction(token),
        true,
        'Se ha suscrito correctamente al sitio Binary Coffee 😊.'
      );
    }
  }

  unsubscribingEmail(unsubscribeToken: string) {
    if (unsubscribeToken) {
      this.executeAction(
        new UnsubscribeAction(unsubscribeToken),
        false,
        'Se ha unsubscrito del sitio Binary Coffee 😥.'
      );
    }
  }

  executeAction(action: object, expectedVerifiedValue: boolean, message: string) {
    this.store.dispatch(action).subscribe(() => {
      const subscription = this.store.selectSnapshot(SubscriptionState.subscription);
      if (subscription?.verified === expectedVerifiedValue) {
        this.message.set(message);
      }
    });
  }
}
