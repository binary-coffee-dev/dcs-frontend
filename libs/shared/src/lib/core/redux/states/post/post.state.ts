import {Injectable} from '@angular/core';

import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, mergeMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

import {PostService} from './post.service';
import {
  ChangePageSizeAction,
  FetchPostAction,
  FetchPostsAction, FetchSimilarPostsAction, CreateLikeArticle,
  NextPageAction,
  PostAction,
  PostCreateAction,
  PostUpdateAction,
  PreviousPageAction, RefreshPostAction,
  SelectPageAction, SetFiltersAction, RemoveLikeArticle, FetchPostUserLikeAction
} from './post.action';
import {initPostStateModel, PostStateModel} from './post-state.model';
import {NotificationType, Post} from '../../models';
import {PaginationBaseClass, ResponseData, StateBase, Where} from '../pagination-base.class';
import {CreateNotificationAction} from '../notification/notification.action';

@State<PostStateModel>({
  name: 'post',
  defaults: initPostStateModel()
})
@Injectable()
export class PostState extends PaginationBaseClass<PostStateModel> {

  @Selector()
  static posts(state: PostStateModel): Post[] {
    return state.elements;
  }

  @Selector()
  static count(state: PostStateModel): number | undefined {
    return state.count;
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
  static newPostId(state: PostStateModel): string | undefined {
    return state.newPostId;
  }

  @Selector()
  static where(state: PostStateModel): Where | undefined {
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
    return this.nextPage(ctx);
  }

  @Action(SetFiltersAction)
  setFiltersAction(ctx: StateContext<PostStateModel>, action: SetFiltersAction) {
    ctx.patchState({where: action.where});
  }

  @Action(PreviousPageAction)
  previousPageAction(ctx: StateContext<PostStateModel>) {
    return this.previousPage(ctx);
  }

  @Action(SelectPageAction)
  selectPageAction(ctx: StateContext<PostStateModel>, action: SelectPageAction) {
    return this.pageByNumber(ctx, action.page, ctx.getState().where);
  }

  @Action(PostAction)
  fetchPostAction(ctx: StateContext<PostStateModel>, action: PostAction) {
    return this.postService.fetchPost(action.postId).pipe(
      tap(post => ctx.patchState({post}))
    );
  }

  @Action(FetchPostAction)
  fetchPostByNameAction(ctx: StateContext<PostStateModel>, action: FetchPostAction) {
    ctx.patchState({userId: action.userId});
    return this.postService.fetchPostByName(action.postName, false).pipe(
      tap(({post, likes}) => ctx.patchState({post, likes}))
    );
  }

  @Action(FetchPostUserLikeAction)
  fetchPostUserLikeAction(ctx: StateContext<PostStateModel>, action: FetchPostUserLikeAction) {
    const userId = action.userId || ctx.getState().userId;
    if (userId) {
      return this.postService.fetchPostUserLikeAction(action.postName, userId).pipe(
        tap(({userLike}) => ctx.patchState({userLike}))
      );
    } else {
      return of({});
    }
  }

  @Action(RefreshPostAction)
  refreshPostAction({dispatch, getState}: StateContext<PostStateModel>) {
    return dispatch(new FetchPostAction(getState().post.name, getState().userId)).pipe(mergeMap(() => {
      return dispatch(new FetchPostUserLikeAction(getState().post.name, getState().userId));
    }));
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

  override fetchElements(pageSize: number, start: number, where = {}): Observable<ResponseData> {
    return this.postService.fetchPosts(pageSize, start, where);
  }

}
