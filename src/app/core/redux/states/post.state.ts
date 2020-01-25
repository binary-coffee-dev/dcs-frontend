import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';

import {PostService} from '../services';
import {FetchPostAction, FetchPostsAction, NextPageAction, PreviousPageAction, RefreshPostAction} from '../actions';
import {initPostStateModel, PostStateModel} from './post-state.model';
import {Post, PostConnection} from '../models';

export const MINIMUM_PAGE = 0;

@State<PostStateModel>({
  name: 'post',
  defaults: initPostStateModel()
})
export class PostState {

  @Selector()
  static posts(state: PostStateModel): Post[] {
    return state.posts;
  }

  @Selector()
  static post(state: PostStateModel): Post {
    return state.post;
  }

  @Selector()
  static firstPage(state: PostStateModel): boolean {
    return state.firstPage;
  }

  @Selector()
  static lastPage(state: PostStateModel): boolean {
    return state.lastPage;
  }

  constructor(private postService: PostService) {
  }

  @Action(FetchPostsAction)
  fetchPostsAction(ctx: StateContext<PostStateModel>) {
    const pageSize = ctx.getState().pageSize;
    const start = ctx.getState().page * pageSize;
    return this.fetchPage(pageSize, start, ctx);
  }

  @Action(NextPageAction)
  nextPageAction(ctx: StateContext<PostStateModel>) {
    const pageSize = ctx.getState().pageSize;
    const currentPage = this.nextPageNumber(ctx.getState().page, ctx.getState().count, pageSize);
    const start = currentPage * pageSize;
    return this.fetchPage(pageSize, start, ctx, currentPage).pipe(tap(() => {
      ctx.patchState({page: currentPage});
    }));
  }

  nextPageNumber(page: number, count: number, pageSize: number) {
    return Math.min(page + 1, !!count ? this.lastPage(count, pageSize) : 0);
  }

  @Action(PreviousPageAction)
  previousPageAction(ctx: StateContext<PostStateModel>) {
    const pageSize = ctx.getState().pageSize;
    const currentPage = Math.max(ctx.getState().page - 1, MINIMUM_PAGE);
    const start = currentPage * pageSize;
    return this.fetchPage(pageSize, start, ctx, currentPage).pipe(tap(() => {
      ctx.patchState({page: currentPage});
    }));
  }

  @Action(FetchPostAction)
  fetchPostAction(ctx: StateContext<PostStateModel>, action: FetchPostAction) {
    return this.postService.fetchPost(action.postId).pipe(tap(post => ctx.patchState({post})));
  }

  @Action(RefreshPostAction)
  refreshPostAction(ctx: StateContext<PostStateModel>) {
    return this.postService.fetchPost(ctx.getState().post.name).pipe(tap(post => ctx.patchState({post})));
  }

  fetchPage(pageSize: number, start: number, ctx: StateContext<PostStateModel>, page?: number) {
    return this.postService.fetchPosts(
      pageSize,
      start
    ).pipe(
      tap((postConnection: PostConnection) => {
        const posts = postConnection ? postConnection.values : [];
        const count = postConnection ? postConnection.aggregate.count : 0;
        ctx.patchState({posts, count});
        this.refreshPaginationVisibility(
          ctx,
          typeof page === 'number' ? page : ctx.getState().page,
          count,
          pageSize
        );
      }));
  }

  refreshPaginationVisibility(ctx: StateContext<PostStateModel>, page, count, pageSize) {
    ctx.patchState({
      firstPage: page === 0,
      lastPage: page === this.lastPage(count, pageSize)
    });
  }

  lastPage(count: number, pageSize: number) {
    return Math.floor(Math.max(count - 1, 0) / (pageSize === 0 ? 1 : pageSize));
  }

}
