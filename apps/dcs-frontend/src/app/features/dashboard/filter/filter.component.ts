import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngxs/store';

import {FetchPostsAction, PostState, SetFiltersAction, Where} from '@dcs-libs/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  filter = '';

  filterForm = new FormGroup({
    filter: new FormControl('')
  });

  resetTime = new Subject();
  _unsubscribe = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.resetTime.next();
    this._unsubscribe.next();
  }

  filterChange() {
    this.resetTime.next();
    timer(1000).pipe(takeUntil(this.resetTime)).subscribe(() => {
      this.changeFilter();
    });
  }

  changeFilter() {
    if (this.checkIfFilterChange()) {
      this.filter = this.filterForm.controls.filter.value;

      const filter = {
        ...(this.store.selectSnapshot(PostState.where) || {}),
        title: this.filter
      } as Where;
      this.store.dispatch(new SetFiltersAction(filter))
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(() => this.store.dispatch(new FetchPostsAction()));
    }
  }

  checkIfFilterChange(): boolean {
    return this.filter !== this.filterForm.controls.filter.value;
  }
}
