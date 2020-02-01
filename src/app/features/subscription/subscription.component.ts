import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  token = '';

  constructor(private activeRouter: ActivatedRoute) {
  }

  ngOnInit() {
    this.token = this.activeRouter.snapshot.params.token;
  }

}
