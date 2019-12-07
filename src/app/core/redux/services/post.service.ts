import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';

import {Post} from '../models';
import {map} from 'rxjs/operators';
import {POST_QUERY, POSTS_QUERY} from '../../graphql/queries';

@Injectable()
export class PostService {
  constructor(private apollo: Apollo) {
  }

  fetchPosts(): Observable<Post[]> {
    return this.apollo
      .watchQuery({query: POSTS_QUERY})
      .valueChanges.pipe(map((result: any) => result.data.posts));
  }

  fetchPost(id: string): Observable<Post> {
    return this.apollo
      .watchQuery({query: POST_QUERY, variables: {id}})
      .valueChanges.pipe(map((result: any) => result.data.post));
  }
}
