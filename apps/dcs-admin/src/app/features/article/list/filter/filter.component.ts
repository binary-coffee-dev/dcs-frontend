import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Subject, timer} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Store} from '@ngxs/store';

import {AuthState, FetchPostsAction, SetFiltersAction, Where} from '@dcs-libs/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {

  currentFilter = '';
  usersFilter = 'me';

  filterForm = new FormGroup({
    filter: new FormControl(''),
    users: new FormControl('me')
  });

  resetTimer = new Subject();
  _unsubscribe = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  filterChange() {
    this.resetTimer.next();
    timer(1000).pipe(takeUntil(this._unsubscribe), takeUntil(this.resetTimer)).subscribe(() => {
      this.changeFilter();
    });
  }

  changeFilter() {
    if (this.checkFilterChange()) {
      this.currentFilter = this.filterForm.controls.filter.value;
      this.usersFilter = this.filterForm.controls.users.value;

      const author = this.usersFilter === 'me' ? this.store.selectSnapshot(AuthState.me).id : undefined;
      const filterStr = this.currentFilter || '';
      const filter = {
        author,
        title: filterStr
      } as Where;
      this.store.dispatch(new SetFiltersAction(filter))
        .pipe(takeUntil(this._unsubscribe))
        .subscribe(() => this.store.dispatch(new FetchPostsAction()));
    }
  }

  checkFilterChange(): boolean {
    return this.currentFilter !== this.filterForm.controls.filter.value ||
      this.usersFilter !== this.filterForm.controls.users.value;
  }
}
