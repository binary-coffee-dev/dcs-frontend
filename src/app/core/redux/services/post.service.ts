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

  fetchPosts(limit, start = 0): Observable<PostConnection> {
    return this.apollo
      .watchQuery({query: POSTS_QUERY, variables: { limit, start }, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => {
        return {
          ...result.data.postsConnection,
          aggregate: {
            count: result.data.countPosts
          }
        } as PostConnection;
      }));
  }

  fetchPost(id: string): Observable<Post> {
    return this.apollo
      .watchQuery({query: POST_QUERY, variables: {id}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.postByName));
  }
}
