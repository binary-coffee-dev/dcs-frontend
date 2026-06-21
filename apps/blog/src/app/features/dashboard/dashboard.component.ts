import { Component, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { PostState } from '@dcs-libs/shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent {
  private store = inject(Store);

  posts = toSignal(this.store.select(PostState.posts));
  isBrowser = signal<boolean>(false);

  constructor() {
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));
  }
}
