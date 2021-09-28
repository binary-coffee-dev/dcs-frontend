import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Comment } from '../../models';
import { COMMENTS_QUERY, RECENT_COMMENTS_QUERY } from '../../../graphql/queries';
import { CREATE_COMMENT_MUTATION, EDIT_COMMENT_MUTATION, REMOVE_COMMENT_MUTATION } from '../../../graphql/mutations';
import { EditCommentAction } from './comment.action';

@Injectable()
export class CommentService {

  constructor(private apollo: Apollo) {
  }

  fetchComments(postId): Observable<Comment[]> {
    return this.apollo
      .watchQuery({query: COMMENTS_QUERY, variables: {postId}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => {
        return result.data.commentsConnection.values;
      }));
  }

  createComment(comment: Comment) {
    return this.apollo
      .mutate({mutation: CREATE_COMMENT_MUTATION, variables: {...comment}})
      .pipe(map((result: any) => result.data.comment));
  }

  recentComments() {
    return this.apollo
      .watchQuery({query: RECENT_COMMENTS_QUERY, variables: {limit: 8}})
      .valueChanges.pipe(map((result: any) => result.data.recentComments));
  }

  removeComment(commentId: string): Observable<Comment> {
    return this.apollo
      .mutate({mutation: REMOVE_COMMENT_MUTATION, variables: {id: commentId}})
      .pipe(map((result: any) => result.data.deleteComment.comment));
  }

  editComment(commentId: string, body: string): Observable<Comment> {
    return this.apollo
      .mutate({mutation: EDIT_COMMENT_MUTATION, variables: {id: commentId, body}})
      .pipe(map((result: any) => result.data.updateComment.comment));
  }
}
