import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

import {Captcha, Comment} from '../models';
import {CAPTCHA_QUERY, COMMENTS_QUERY} from '../../graphql/queries';
import {CREATE_COMMENT_MUTATION} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apollo: Apollo) {
  }

  fetchCaptcha(): Observable<Captcha> {
    return this.apollo
      .watchQuery({query: CAPTCHA_QUERY, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.captcha));
  }

  fetchComments(postId): Observable<Comment[]> {
    return this.apollo
      .watchQuery({query: COMMENTS_QUERY, variables: {postId}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.commentsConnection.values));
  }

  createComment(comment: Comment, captcha: Captcha) {
    return this.apollo
      .mutate({mutation: CREATE_COMMENT_MUTATION, variables: {...comment, ...captcha}})
      .pipe(map((result: any) => result.data.comment));
  }
}
