import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { FetchPostsAction, PostState, SetFiltersAction, Where } from '@dcs-libs/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  filter = '';

  filterForm = new UntypedFormGroup({
    filter: new UntypedFormControl('')
  });

  resetTime = new Subject();
  _unsubscribe = new Subject();

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.extractParams();
  }

  extractParams() {
    this.filter = this.route.snapshot.queryParamMap.get('filter') || '';
    this.filterForm.controls['filter'].setValue(this.filter);

    this.dispatchNewFilter({title: this.filter});
  }

  ngOnDestroy(): void {
    this.resetTime.next(true);
    this._unsubscribe.next(true);
  }

  filterChange() {
    this.resetTime.next(true);
    timer(1000).pipe(takeUntil(this.resetTime)).subscribe(() => {
      this.changeFilter();
    });
  }

  changeFilter() {
    if (this.checkIfFilterChange()) {
      this.filter = this.filterForm.controls['filter'].value;

      this.dispatchNewFilter({title: this.filter});
    }
  }

  dispatchNewFilter(newFilters: any) {
    const filter = {
      ...(this.store.selectSnapshot(PostState.where) || {}),
      ...newFilters
    } as Where;
    this.store.dispatch(new SetFiltersAction(filter))
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(() => {
        this.store.dispatch(new FetchPostsAction());
        this.updateRoute();
      });
  }

  updateRoute() {
    const queryParams = {} as Params;
    if (this.filter !== '') {
      queryParams['filter'] = this.filter;
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParamsHandling: null,
      queryParams
    });
  }

  checkIfFilterChange(): boolean {
    return this.filter !== this.filterForm.controls['filter'].value;
  }
}
