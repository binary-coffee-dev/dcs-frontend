import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";

import { Store } from '@ngxs/store';

import { SubscribeAction, SubscriptionState } from '@dcs-libs/shared';


@Component({
  selector: 'app-subscribe-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.scss']
})
export class SubscribeDialogComponent implements OnInit {

  subscribeForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email])
  });

  constructor(private dialogRef: MatDialogRef<SubscribeDialogComponent>,
              private store: Store) {
  }

  ngOnInit(): void {
  }

  ok() {
    this.store
      .dispatch(new SubscribeAction(this.subscribeForm.controls['email'].value))
      .subscribe(() => {
        const subscription = this.store.selectSnapshot(
          SubscriptionState.subscription
        );
        let message = undefined;
        if (subscription && !subscription.verified) {
          message = 'La suscripción ha sido correctamente enviada, revise su email para verificarlo.';
        } else if (subscription && subscription.verified) {
          message = 'El email ya se encuentra suscrito al sitio';
        } else {
          message = 'Error: Ha ocurrido algún problema con su suscripción. Por favor, contáctenos en website@binary-coffee.dev';
        }
        this.dialogRef.close(message);
      });
  }

  cancel() {
    this.dialogRef.close();
  }
}
