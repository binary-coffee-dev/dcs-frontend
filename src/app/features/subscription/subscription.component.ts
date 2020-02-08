import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';
import { SubscribeAction, VerifySubscriptionAction } from './redux/subscription.action';
import { SubscriptionState } from './redux/subscription.state';
import { Subscription } from './redux/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  token = '';

  message = '';

  subscriptionError = '';
  subscriptionSent = false;

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private activeRouter: ActivatedRoute,
    private store: Store,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.token = this.activeRouter.snapshot.params.token;
    if (this.token) {
      this.store.dispatch(new VerifySubscriptionAction(this.token)).subscribe(() => {
        const subscription = this.store.selectSnapshot(SubscriptionState.subscription);
        if (subscription.verified) {
          this.message = 'Se ha suscrito correctamente al sitio Binary Coffee.';
        }
      });
    }
  }

  subscribe() {
    if (this.subscribeForm.valid) {
      this.store.dispatch(new SubscribeAction(this.subscribeForm.controls.email.value)).subscribe(() => {
        const subscription = this.store.selectSnapshot(SubscriptionState.subscription);
        if (subscription && !subscription.verified) {
          this.message = 'La suscripción a sido correctamente enviada, revise su email para verificarlo';
          this.subscriptionSent = true;
        } else if (subscription && subscription.verified) {
          this.subscriptionError = 'El email ya se encuentra suscrito al sitio';
        } else {
          this.subscriptionError =
            'Error: Ha ocurrido algún problema con su suscripción. Por favor, contáctenos en website@binary-coffee.dev';
        }
      });
    } else {
      this.subscriptionError = 'Error: Email incorrecto';
    }
  }

  backClicked() {
    this.location.back();
  }
}
