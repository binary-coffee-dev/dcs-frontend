import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import { NextPageAction, PostState, PreviousPageAction } from '@dcs-libs/shared';
import { ScrollService } from '../../../core/services';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnInit {
  private store = inject(Store);
  private scroll = inject(ScrollService);


  firstPage: Observable<boolean> = of(false);
  lastPage: Observable<boolean> = of(false);

  ngOnInit() {
    this.firstPage = this.store.select(PostState.firstPage);
    this.lastPage = this.store.select(PostState.lastPage);
  }

  nextPage() {
    this.store.dispatch(new NextPageAction()).subscribe(() => {
      this.scroll.smoothScroll();
    });
  }

  previousPage() {
    this.store.dispatch(new PreviousPageAction()).subscribe(() => this.scroll.smoothScroll());
  }

}
