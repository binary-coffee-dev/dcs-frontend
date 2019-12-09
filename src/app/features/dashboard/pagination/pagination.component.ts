import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {NextPageAction, PreviousPageAction} from '../../../core/redux/actions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  nextPage() {
    this.store.dispatch(new NextPageAction());
  }

  previousPage() {
    this.store.dispatch(new PreviousPageAction());
  }

}
