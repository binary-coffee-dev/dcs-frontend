import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Store} from '@ngxs/store';
import {VerifySubscriptionAction} from './redux/subscription.action';
import {SubscriptionState} from './redux/subscription.state';
import {Subscription} from './redux/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  token = '';

  message = '';

  subscriptionError = false;
  subscriptionSent = true;

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private activeRouter: ActivatedRoute,
    private store: Store
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
    } else {
      this.subscriptionError = true;
    }
  }
}
