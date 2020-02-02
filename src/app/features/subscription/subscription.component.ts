import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Store} from '@ngxs/store';
import {VerifySubscriptionAction} from './redux/subscription.action';
import {SubscriptionState} from './redux/subscription.state';
import {Subscription} from './redux/models';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  token = '';
  subscription: Subscription;

  constructor(
    private activeRouter: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.token = this.activeRouter.snapshot.params.token;
    this.store.dispatch(new VerifySubscriptionAction(this.token)).subscribe(() => {
      this.subscription = this.store.selectSnapshot(SubscriptionState.subscription);
    });
  }

}
