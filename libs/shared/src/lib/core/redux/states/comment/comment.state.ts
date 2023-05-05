import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { CommentService } from './comment.service';
import { CommentStateModel, initCommentStateModel } from './comment-state.model';
import {
  CommentErrorAction,
  CreateCommentAction, EditCommentAction,
  FetchCommentsAction,
  RecentCommentAction, RemoveCommentAction
} from './comment.action';
import { RefreshPostAction } from '../post/post.action';
import { CommentError, Comment } from '../../models';

@State<CommentStateModel>({
  name: 'comment',
  defaults: initCommentStateModel()
})
@Injectable()
export class CommentState {

  @Selector()
  static comments(state: CommentStateModel): Comment[] {
    return state.comments;
  }

  @Selector()
  static commentsCount(state: CommentStateModel): number {
    return state && state.comments && state.comments.length || 0;
  }

  @Selector()
  static error(state: CommentStateModel): CommentError {
    return state.error;
  }

  @Selector()
  static recentComments(state: CommentStateModel): Comment[] {
    return state.recentComments;
  }

  constructor(private commentService: CommentService) {
  }

  @Action(CreateCommentAction)
  createCommentAction(ctx: StateContext<CommentStateModel>, action: CreateCommentAction) {
    return this.commentService.createComment(action.comment).pipe(
      tap(() => ctx.dispatch(new RefreshPostAction())),
      catchError((error: Error) => {
        switch (error.message) {
          case 'GraphQL error: invalid-data':
            ctx.dispatch(new CommentErrorAction('Error al crear el comentario'));
            break;
          case 'Forbidden':
            ctx.dispatch(new CommentErrorAction('Debe autenticarse para comentar'));
            break;
        }
        return of();
      })
    );
  }

  @Action(CommentErrorAction)
  commentErrorAction(ctx: StateContext<CommentStateModel>, action: CommentErrorAction) {
    ctx.patchState({error: {message: action.errorMessage, timestamp: new Date().getTime()}});
  }

  @Action(FetchCommentsAction)
  fetchCommentsAction(ctx: StateContext<CommentStateModel>, action: FetchCommentsAction) {
    return this.commentService.fetchComments(action.postId).pipe(
      take(1),
      tap(comments => ctx.patchState({comments}))
    );
  }

  @Action(RecentCommentAction)
  fetchRecentCommentAction(ctx: StateContext<CommentStateModel>) {
    return this.commentService.recentComments().pipe(
      take(1),
      tap(recentComments => ctx.patchState({recentComments}))
    );
  }

  @Action(RemoveCommentAction)
  removeCommentAction(ctx: StateContext<CommentStateModel>, action: RemoveCommentAction) {
    return this.commentService.removeComment(action.commentId).pipe(
      tap(recentComments => ctx.patchState({comments: ctx.getState().comments.filter(c => c.id !== recentComments.id)})),
    );
  }

  @Action(EditCommentAction)
  editCommentAction(ctx: StateContext<CommentStateModel>, action: EditCommentAction) {
    return this.commentService.editComment(action.commentId, action.body).pipe(
      tap(recentComments => ctx.patchState({
        comments: ctx.getState().comments.map(c => c.id === recentComments.id ? recentComments : c)
      }))
    );
  }
}
