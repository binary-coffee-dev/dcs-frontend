import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SubscribeAction, SubscriptionState } from "@dcs-libs/shared";


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit, OnDestroy {

  _unsubscribe = new Subject();

  message = '';
  subscriptionError = '';
  subscriptionSent = false;

  loading = true;

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.subscribeToLoading();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
  }

  subscribeToLoading(): void {
    this.store.select(SubscriptionState.loading)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((loading) => {
        this.loading = loading;
        this.subscribeForm = new FormGroup({
          email: new FormControl({value: this.subscribeForm.controls['email'].value, disabled: loading})
        });
      });
  }

  subscribe() {
    if (this.subscribeForm.valid && !this.loading) {
      this.store
        .dispatch(new SubscribeAction(this.subscribeForm.controls['email'].value || ''))
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(() => {
          const subscription = this.store.selectSnapshot(
            SubscriptionState.subscription
          );
          if (subscription && !subscription.verified) {
            this.subscriptionError = '';
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
    } else if (!this.loading) {
      this.subscriptionError = 'Error: Email incorrecto';
    }
  }
}
