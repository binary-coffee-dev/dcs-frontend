import { Component, OnInit, inject, signal } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import {
  NextPageAction,
  PostState,
  PreviousPageAction,
} from '@dcs-libs/shared';
import { ScrollService } from '../../../core/services';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: false,
})
export class PaginationComponent {
  private store = inject(Store);
  private scroll = inject(ScrollService);

  firstPage = toSignal(this.store.select(PostState.firstPage));
  lastPage = toSignal(this.store.select(PostState.lastPage));

  nextPage() {
    this.store.dispatch(new NextPageAction()).subscribe(() => {
      this.scroll.smoothScroll();
    });
  }

  previousPage() {
    this.store
      .dispatch(new PreviousPageAction())
      .subscribe(() => this.scroll.smoothScroll());
  }
}
