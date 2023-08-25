import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { Store } from '@ngxs/store';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { SubscribeAction, SubscriptionState } from "@dcs-libs/shared";


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnDestroy {

  _unsubscribe = new Subject();

  message = '';
  subscriptionError = '';
  subscriptionSent = false;

  subscribeForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email])
  });

  constructor(private store: Store) {
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
  }

  subscribe() {
    if (this.subscribeForm.valid) {
      this.store
        .dispatch(new SubscribeAction(this.subscribeForm.controls['email'].value))
        .subscribe(() => {
          const subscription = this.store.selectSnapshot(
            SubscriptionState.subscription
          );
          if (subscription && !subscription.verified) {
            this.message =
              'La suscripción ha sido correctamente enviada, revise su email para verificarlo.';
          } else if (subscription && subscription.verified) {
            this.subscriptionError =
              'El email ya se encuentra suscrito al sitio';
          } else {
            this.subscriptionError =
              'Error: Ha ocurrido un problema con su suscripción. Por favor, contáctenos en website@binarycoffee.dev';
          }
        });
    } else {
      this.subscriptionError = 'Error: Email incorrecto';
    }
  }
}
