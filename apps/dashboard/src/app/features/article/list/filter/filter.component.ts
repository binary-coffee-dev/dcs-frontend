import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngxs/store';

import { AuthState, FetchPostsAction, SetFiltersAction, Where } from '@dcs-libs/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  standalone: false
})
export class FilterComponent {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  currentFilter = '';
  usersFilter = 'me';

  filterForm = new UntypedFormGroup({
    filter: new UntypedFormControl(''),
    users: new UntypedFormControl('me')
  });

  resetTimer = new Subject();

  filterChange() {
    this.resetTimer.next(true);
    timer(1000)
      .pipe(takeUntilDestroyed(this.destroyRef), takeUntil(this.resetTimer))
      .subscribe(() => {
        this.changeFilter();
      });
  }

  changeFilter() {
    if (this.checkFilterChange()) {
      this.currentFilter = this.filterForm.controls['filter'].value;
      this.usersFilter = this.filterForm.controls['users'].value;

      const author =
        this.usersFilter === 'me'
          ? { id: { eq: this.store.selectSnapshot(AuthState.me)?.id } }
          : undefined;
      const filterStr = this.currentFilter || '';
      const filter = {
        author,
        title: { contains: filterStr },
        state: 'PREVIEW'
      } as Where;
      this.store
        .dispatch(new SetFiltersAction(filter))
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.store.dispatch(new FetchPostsAction()));
    }
  }

  checkFilterChange(): boolean {
    return (
      this.currentFilter !== this.filterForm.controls['filter'].value ||
      this.usersFilter !== this.filterForm.controls['users'].value
    );
  }
}
