import {StateContext} from '@ngxs/store';
import {take, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

export const MINIMUM_PAGE = 0;

export interface StateBase {
  elements: any[];
  count: number;
  page: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface ResponseData {
  values: any[];
  aggregate: {
    count: number;
  };
}

export class PaginationBaseClass<T extends StateBase> {
  nextPage(ctx: StateContext<T>) {
    const pageSize = ctx.getState().pageSize;
    const currentPage = this.nextPageNumber(ctx.getState().page, ctx.getState().count, pageSize);
    return this.pageByNumber(ctx, currentPage);
  }

  previousPage(ctx: StateContext<T>) {
    const currentPage = Math.max(ctx.getState().page - 1, MINIMUM_PAGE);
    return this.pageByNumber(ctx, currentPage);
  }

  pageByNumber(ctx: StateContext<T>, page: number) {
    const count = ctx.getState().count;
    const pageSize = ctx.getState().pageSize;
    if (page >= 0 && page <= this.lastPage(count, pageSize)) {
      return this.fetchPage(pageSize, page * pageSize, ctx, page).pipe(tap(() => {
        ctx.patchState({page} as unknown as Partial<T>);
      }));
    }
  }

  fetchPage(pageSize: number, start: number, ctx: StateContext<T>, page?: number) {
    return this.fetchElements(
      pageSize,
      start
    ).pipe(
      tap((response: ResponseData) => {
        const elements = response ? response.values : [];
        const count = response ? response.aggregate.count : 0;
        ctx.patchState({elements, count} as unknown as Partial<T>);
        this.refreshPaginationVisibility(
          ctx,
          typeof page === 'number' ? page : ctx.getState().page,
          count,
          pageSize
        );
      }),
      take(1)
    );
  }

  fetchElements(pageSize, start): Observable<ResponseData> {
    return of({} as ResponseData);
  }

  refreshPaginationVisibility(ctx: StateContext<T>, page, count, pageSize) {
    ctx.patchState({
      firstPage: page === 0,
      lastPage: page === this.lastPage(count, pageSize)
    } as unknown as Partial<T>);
  }

  nextPageNumber(page: number, count: number, pageSize: number) {
    return Math.min(page + 1, !!count ? this.lastPage(count, pageSize) : 0);
  }

  lastPage(count: number, pageSize: number) {
    return Math.floor(Math.max(count - 1, 0) / (pageSize === 0 ? 1 : pageSize));
  }
}
