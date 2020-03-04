import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Apollo} from 'apollo-angular';

import {Post, PostConnection, User} from '../models';
import {POST_QUERY, POSTS_QUERY} from '../../graphql/queries';
import {POST_CREATE_MUTATION, POST_UPDATE_MUTATION} from '../../graphql/mutations';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private apollo: Apollo) {
  }

  fetchPosts(limit, start = 0): Observable<PostConnection> {
    return this.apollo
      .watchQuery({query: POSTS_QUERY, variables: {limit, start}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.postsConnection));
  }

  fetchPost(id: string): Observable<Post> {
    return this.apollo
      .watchQuery({query: POST_QUERY, variables: {id}, fetchPolicy: 'no-cache'})
      .valueChanges.pipe(map((result: any) => result.data.post));
  }

  updatePost(post: Post) {
    const banner = post.banner && post.banner.id;
    const author = post.author && post.author.id;
    return this.apollo
      .mutate({mutation: POST_UPDATE_MUTATION, variables: {...post, banner, author}})
      .pipe(map((result: any) => result.data.updatePost.post));
  }

  createPost(post: Post, me: User) {
    const banner = post.banner && post.banner.id;
    return this.apollo
      .mutate({mutation: POST_CREATE_MUTATION, variables: {...post, author: me.id, banner}})
      .pipe(map((result: any) => result.data.createPost.post));
  }
}
