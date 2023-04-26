import { StateContext } from '@ngxs/store';
import { take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

export const MINIMUM_PAGE = 0;

export interface StateBase {
  elements: any[];
  count: number;
  page: number;
  pageSize: number;
  firstPage: boolean;
  lastPage: boolean;
  where?: Where;
}

export interface Where {
  enable?: boolean;
  author?: string | string[];
  title: string;
}

export interface ResponseData {
  values: any[];
  aggregate: {
    count: number;
  };
}

export class PaginationBaseClass<T extends StateBase> {
  changePageSize(ctx: StateContext<T>, pageSize: number | undefined) {
    ctx.patchState({pageSize} as unknown as Partial<T>);
  }

  nextPage(ctx: StateContext<T>) {
    const pageSize = ctx.getState().pageSize;
    const currentPage = this.nextPageNumber(ctx.getState().page, ctx.getState().count, pageSize);
    const where = ctx.getState().where;
    return this.pageByNumber(ctx, currentPage, where);
  }

  previousPage(ctx: StateContext<T>) {
    const currentPage = Math.max(ctx.getState().page - 1, MINIMUM_PAGE);
    const where = ctx.getState().where;
    return this.pageByNumber(ctx, currentPage, where);
  }

  pageByNumber(ctx: StateContext<T>, page: number, where = {}) {
    const count = ctx.getState().count;
    const pageSize = ctx.getState().pageSize;
    if (page >= 0 && page <= this.lastPage(count, pageSize)) {
      return this.fetchPage(pageSize, page * pageSize, where, ctx, page).pipe(tap(() => {
        ctx.patchState({page} as unknown as Partial<T>);
      }));
    }
    return of(false);
  }

  fetchPage(pageSize: number, start: number, where = {}, ctx: StateContext<T>, page?: number) {
    return this.fetchElements(
      pageSize,
      start,
      where
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

  fetchElements(pageSize: number, start: number, where = {}): Observable<ResponseData> {
    return of({} as ResponseData);
  }

  refreshPaginationVisibility(ctx: StateContext<T>, page: number, count: number, pageSize: number) {
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
