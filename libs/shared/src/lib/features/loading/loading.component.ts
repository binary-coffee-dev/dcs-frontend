import { Component, OnInit, inject, signal } from '@angular/core';

import { Actions, ofActionCompleted, ofActionDispatched } from '@ngxs/store';

import { LoginWithProviderAction } from '../../core/redux/states/auth';
import { FetchPostsAction, PostAction } from '../../core/redux/states/post';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  standalone: false,
})
export class LoadingComponent implements OnInit {
  private actions = inject(Actions);

  loadingCount = signal<number>(0);

  actionToLoading = [FetchPostsAction, PostAction, LoginWithProviderAction];

  ngOnInit() {
    this.actionToLoading.forEach((action) => {
      this.actions
        .pipe(ofActionDispatched(action))
        .subscribe(() => this.loadingCount.update((count) => count + 1));
      this.actions
        .pipe(ofActionCompleted(action))
        .subscribe(() => this.loadingCount.update((count) => count - 1));
    });
  }
}
