import { Component, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';

import { SubscribeAction, SubscriptionState } from '@dcs-libs/shared';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
  standalone: false,
})
export class SubscribeComponent implements OnInit {
  private store = inject(Store);

  message = signal<string>('');
  subscriptionError = signal<string>('');
  subscriptionSent = signal<boolean>(false);
  loading = signal<boolean>(false);

  subscribeForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    this.subscribeToLoading();
  }

  subscribeToLoading(): void {
    this.store
      .select(SubscriptionState.loading)
      .pipe(takeUntilDestroyed())
      .subscribe((loading) => {
        this.loading.set(loading);
        if (loading) {
          this.subscribeForm.controls.email.disable();
        } else {
          this.subscribeForm.controls.email.enable();
        }
      });
  }

  subscribe() {
    if (this.subscribeForm.valid && !this.loading()) {
      this.store
        .dispatch(
          new SubscribeAction(this.subscribeForm.controls['email'].value || '')
        )
        .pipe(takeUntilDestroyed())
        .subscribe(() => {
          const subscription = this.store.selectSnapshot(
            SubscriptionState.subscription
          );
          if (subscription && !subscription.verified) {
            this.subscriptionError.set('');
            this.message.set(
              'La suscripción ha sido correctamente enviada, revise su email para verificarlo.'
            );
          } else if (subscription && subscription.verified) {
            this.message.set('');
            this.subscriptionError.set(
              'El email ya se encuentra suscrito al sitio'
            );
          } else {
            this.message.set('');
            this.subscriptionError.set(
              'Error: Ha ocurrido un problema con su suscripción. Por favor, contáctenos en website@binarycoffee.dev'
            );
          }
          this.subscribeForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
          });
        });
    } else if (!this.loading()) {
      this.message.set('');
      this.subscriptionError.set('Error: Email incorrecto');
    }
  }
}
