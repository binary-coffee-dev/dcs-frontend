import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

import {Post} from '../models';
import {map} from 'rxjs/operators';


const POSTS_QUERY = gql` { posts { id title description } } `;

@Injectable()
export class PostService {
  constructor(private apollo: Apollo) {
  }

  fetchPosts(): Observable<Post[]> {
    return this.apollo
      .watchQuery({query: POSTS_QUERY})
      .valueChanges.pipe(map((result: any) => result.data.posts));
  }
}
