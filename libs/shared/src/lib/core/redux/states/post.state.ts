import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, take, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { PostService } from '../services';
import {
  ChangePageSizeAction,
  CreateNotificationAction, FetchPostAction,
  FetchPostsAction, FetchSimilarPostsAction, CreateLikeArticle,
  NextPageAction,
  PostAction,
  PostCreateAction,
  PostUpdateAction,
  PreviousPageAction, RefreshPostAction,
  SelectPageAction, SetFiltersAction, RemoveLikeArticle
} from '../actions';
import { initPostStateModel, PostStateModel } from './post-state.model';
import { NotificationType, Post } from '../models';
import { PaginationBaseClass, ResponseData, StateBase, Where } from './pagination-base.class';

@State<PostStateModel>({
  name: 'post',
  defaults: initPostStateModel()
})
export class PostState extends PaginationBaseClass<PostStateModel> {

  @Selector()
  static posts(state: PostStateModel): Post[] {
    return state.elements;
  }

  @Selector()
  static post(state: PostStateModel): Post {
    return state.post;
  }

  @Selector()
  static likes(state: PostStateModel): number {
    return state.likes;
  }

  @Selector()
  static userLike(state: PostStateModel): number {
    return state.userLike;
  }

  @Selector()
  static similarPosts(state: PostStateModel): Post[] {
    return state.similarPosts;
  }

  @Selector()
  static pageIndicator(state: PostStateModel): StateBase {
    return {...state} as StateBase;
  }

  @Selector()
  static firstPage(state: PostStateModel): boolean {
    return state.firstPage;
  }

  @Selector()
  static lastPage(state: PostStateModel): boolean {
    return state.lastPage;
  }

  @Selector()
  static newPostId(state: PostStateModel): string {
    return state.newPostId;
  }

  @Selector()
  static where(state: PostStateModel): Where {
    return state.where;
  }

  constructor(private postService: PostService) {
    super();
  }

  @Action(ChangePageSizeAction)
  changePageSizeAction(ctx: StateContext<PostStateModel>, action: ChangePageSizeAction) {
    this.changePageSize(ctx, action.pageSize);
  }

  @Action(FetchPostsAction)
  fetchPostsAction(ctx: StateContext<PostStateModel>) {
    const pageSize = ctx.getState().pageSize;
    const start = ctx.getState().page * pageSize;
    const where = ctx.getState().where || {};
    return this.fetchPage(pageSize, start, where, ctx);
  }

  @Action(NextPageAction)
  nextPageAction(ctx: StateContext<PostStateModel>) {
    return this.nextPage(ctx).pipe(take(1));
  }

  @Action(SetFiltersAction)
  setFiltersAction(ctx: StateContext<PostStateModel>, action: SetFiltersAction) {
    ctx.patchState({where: action.where});
  }

  @Action(PreviousPageAction)
  previousPageAction(ctx: StateContext<PostStateModel>) {
    return this.previousPage(ctx).pipe(take(1));
  }

  @Action(SelectPageAction)
  selectPageAction(ctx: StateContext<PostStateModel>, action: SelectPageAction) {
    return this.pageByNumber(ctx, action.page, ctx.getState().where).pipe(take(1));
  }

  @Action(PostAction)
  fetchPostAction(ctx: StateContext<PostStateModel>, action: PostAction) {
    return this.postService.fetchPost(action.postId).pipe(
      tap(post => ctx.patchState({post})),
      take(1)
    );
  }

  @Action(FetchPostAction)
  fetchPostByNameAction(ctx: StateContext<PostStateModel>, action: FetchPostAction) {
    return this.postService.fetchPostByName(action.postName).pipe(
      tap(({post, userLike, likes}) => ctx.patchState({post, likes, userLike})),
      take(1)
    );
  }

  @Action(RefreshPostAction)
  refreshPostAction(ctx: StateContext<PostStateModel>) {
    return this.postService.fetchPostByName(ctx.getState().post.name).pipe(
      tap(({post, userLike, likes}) => ctx.patchState({post, likes, userLike})),
      take(1)
    );
  }

  @Action(PostUpdateAction)
  postUpdateAction(ctx: StateContext<PostStateModel>, action: PostUpdateAction) {
    return this.postService.updatePost(action.post).pipe(tap(() => {
      ctx.dispatch(new CreateNotificationAction('Artículo actualizado correctamente', NotificationType.info));
    }));
  }

  @Action(PostCreateAction)
  postCreateAction(ctx: StateContext<PostStateModel>, action: PostCreateAction) {
    return this.postService.createPost(action.post, action.me).pipe(tap(post => {
      ctx.patchState({newPostId: post.id});
      ctx.dispatch(new CreateNotificationAction('Artículo creado correctamente', NotificationType.info));
    }));
  }

  @Action(FetchSimilarPostsAction)
  fetchSimilarPostsAction(ctx: StateContext<PostStateModel>, action: FetchSimilarPostsAction) {
    return this.postService.fetchSimilarPostsAction(action.id, action.limit).pipe(tap(posts => {
      ctx.patchState({similarPosts: posts || []});
    }));
  }

  @Action(CreateLikeArticle)
  likeArticle(ctx: StateContext<PostStateModel>, action: CreateLikeArticle) {
    ctx.patchState({userLike: 1, likes: ctx.getState().likes + 1});
    return this.postService.likeArticle(action.userId, action.postId).pipe(
      tap(() => ctx.dispatch(new RefreshPostAction())),
      catchError(() => {
        ctx.patchState({userLike: 0, likes: ctx.getState().likes - 1});
        return of({});
      })
    );
  }

  @Action(RemoveLikeArticle)
  removeLikeArticle(ctx: StateContext<PostStateModel>, action: RemoveLikeArticle) {
    ctx.patchState({userLike: 0, likes: ctx.getState().likes - 1});
    return this.postService.removeLikeArticle(action.postId).pipe(
      tap(() => ctx.dispatch(new RefreshPostAction())),
      catchError(() => {
        ctx.patchState({userLike: 1, likes: ctx.getState().likes + 1});
        return of({});
      })
    );
  }

  fetchElements(pageSize, start, where = {}): Observable<ResponseData> {
    return this.postService.fetchPosts(pageSize, start, where);
  }

}
