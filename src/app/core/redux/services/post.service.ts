import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';

import {POST_QUERY, POSTS_QUERY} from '../../graphql/queries';
import {Post, PostConnection} from '../models';

@Injectable()
export class PostService {
  constructor(private apollo: Apollo) {
  }

  fetchPosts(): Observable<PostConnection> {
    return this.apollo
      .watchQuery({query: POSTS_QUERY})
      .valueChanges.pipe(map((result: any) => result.data.postsConnection));
  }

  fetchPost(id: string): Observable<Post> {
    return this.apollo
      .watchQuery({query: POST_QUERY, variables: {id}})
      .valueChanges.pipe(map((result: any) => result.data.post));
  }
}
