import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import {PostService} from '../services';
import {
  CreateNotificationAction,
  FetchPostsAction,
  NextPageAction,
  PostAction,
  PostCreateAction,
  PostUpdateAction,
  PreviousPageAction,
  SelectPageAction
} from '../actions';
import {initPostStateModel, PostStateModel} from './post-state.model';
import {NotificationType, Post} from '../models';
import {PaginationBaseClass, ResponseData, StateBase} from './pagination-base.class';

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

  constructor(private postService: PostService) {
    super();
  }

  @Action(FetchPostsAction)
  fetchPostsAction(ctx: StateContext<PostStateModel>) {
    const pageSize = ctx.getState().pageSize;
    const start = ctx.getState().page * pageSize;
    return this.fetchPage(pageSize, start, ctx);
  }

  @Action(NextPageAction)
  nextPageAction(ctx: StateContext<PostStateModel>) {
    return this.nextPage(ctx);
  }

  @Action(PreviousPageAction)
  previousPageAction(ctx: StateContext<PostStateModel>) {
    return this.previousPage(ctx);
  }

  @Action(SelectPageAction)
  selectPageAction(ctx: StateContext<PostStateModel>, action: SelectPageAction) {
    return this.pageByNumber(ctx, action.page);
  }

  @Action(PostAction)
  fetchPostAction(ctx: StateContext<PostStateModel>, action: PostAction) {
    return this.postService.fetchPost(action.postId).pipe(tap(post => ctx.patchState({post})));
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

  fetchElements(pageSize, start): Observable<ResponseData> {
    return this.postService.fetchPosts(pageSize, start);
  }

}
