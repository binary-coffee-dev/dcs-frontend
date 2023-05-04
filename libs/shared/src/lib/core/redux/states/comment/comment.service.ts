import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Comment } from '../../models';
import { COMMENTS_QUERY, RECENT_COMMENTS_QUERY } from '../../../graphql/queries';
import { CREATE_COMMENT_MUTATION, EDIT_COMMENT_MUTATION, REMOVE_COMMENT_MUTATION } from '../../../graphql/mutations';

@Injectable()
export class CommentService {

  constructor(private apollo: Apollo) {
  }

  fetchComments(postId: string): Observable<Comment[]> {
    return this.apollo
      .query({query: COMMENTS_QUERY, variables: {postId}, fetchPolicy: 'no-cache'})
      .pipe(map((result: any) => result.data.comments));
  }

  createComment(comment: Comment) {
    return this.apollo
      .mutate({mutation: CREATE_COMMENT_MUTATION, variables: {...comment}})
      .pipe(map((result: any) => result.data.comment));
  }

  recentComments() {
    return this.apollo
      .query({query: RECENT_COMMENTS_QUERY, variables: {limit: 8}})
      .pipe(map((result: any) => result.data.recentComments));
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
