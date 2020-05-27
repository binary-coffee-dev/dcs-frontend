import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

import {Comment} from '../models';
import {COMMENTS_QUERY, RECENT_COMMENTS_QUERY} from '../../graphql/queries';
import {CREATE_COMMENT_MUTATION} from '../../graphql/mutations';

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
      .watchQuery({query: RECENT_COMMENTS_QUERY})
      .valueChanges.pipe(map((result: any) => result.data.recentComments));
  }
}
