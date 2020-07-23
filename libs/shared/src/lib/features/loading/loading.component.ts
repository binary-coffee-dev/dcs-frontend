import { Component, OnInit } from '@angular/core';

import { Actions, ofActionCompleted, ofActionDispatched } from '@ngxs/store';

import { FetchPostsAction, LoginWithProviderAction, PostAction } from '../../core/redux/actions';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  loadingCount = 0;

  actionToLoading = [
    FetchPostsAction,
    PostAction,
    LoginWithProviderAction
  ];

  constructor(private actions: Actions) {
  }

  ngOnInit() {
    this.actionToLoading.forEach((action) => {
      this.actions.pipe(ofActionDispatched(action)).subscribe(() => this.loadingCount++);
      this.actions.pipe(ofActionCompleted(action)).subscribe(() => this.loadingCount--);
    });
  }

}
