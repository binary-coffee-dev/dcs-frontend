import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { NextPageAction, PostState, PreviousPageAction } from '@dcs-libs/shared';
import { ScrollService } from '../../../core/services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  firstPage: Observable<boolean>;
  lastPage: Observable<boolean>;

  constructor(private store: Store, private scroll: ScrollService) {
  }

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
