import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { Post, PostConnection, User } from '../../models';
import { POST_BY_NAME_QUERY, POST_QUERY, POSTS_QUERY, SIMILAR_POSTS_QUERY } from '../../../graphql/queries';
import {
  LIKE_CREATE_MUTATION,
  LIKE_REMOVE_MUTATION,
  POST_CREATE_MUTATION,
  POST_UPDATE_MUTATION
} from '../../../graphql/mutations';
import { Environment, ENVIRONMENT } from '../../../models';
import {UpdateResponseService} from "../../../services/update-response.service";
import { Where } from '../pagination-base.class';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private apollo: Apollo,
    @Inject(ENVIRONMENT) private env: Environment,
    private responseService: UpdateResponseService) {
  }

  fetchPosts(limit: number, start = 0, where: any = {}): Observable<PostConnection> {
    const sort = [!!this.env.isDashboard ? 'createdAt:desc' : 'publishedAt:desc'];
    let state: any = 'LIVE';
    where = {...where};
    if (where.state) {
      state = where.state;
      delete where.state;
    }
    return this.apollo
      .query({
        query: POSTS_QUERY,
        variables: { limit, start, filters: where, sort, state },
        fetchPolicy: 'no-cache'
      })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => ({
        values: result.data.posts,
        aggregate: {
          count: result.data.meta_posts.pagination.total
        }
      })));
  }

  fetchPost(id: string): Observable<Post> {
    return this.apollo
      .query({ query: POST_QUERY, variables: { id: +id }, fetchPolicy: 'no-cache' })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.post));
  }

  fetchPostByName(name: string | null, noUpdate = false, userId: string): Observable<any> {
    return this.apollo
      .query({ query: POST_BY_NAME_QUERY, variables: { name, noUpdate, userId }, fetchPolicy: 'no-cache' })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => ({
        post: result.data.postByName,
        likes: result.data.likes.meta.pagination.total,
        userLike: result.data.userLike.meta.pagination.total
      })));
  }

  updatePost(post: Post) {
    const banner = post.banner && post.banner.id;
    const author = post.author && post.author.id;
    const tags = post.tags.map(tag => tag.id);
    return this.apollo
      .mutate({ mutation: POST_UPDATE_MUTATION, variables: { ...post, banner, author, tags } })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.updatePost));
  }

  createPost(post: Post, me: User | undefined) {
    const banner = post.banner && post.banner.id;
    const tags = post.tags.map(tag => tag.id);
    return this.apollo
      .mutate({ mutation: POST_CREATE_MUTATION, variables: { ...post, author: me?.id, banner, tags } })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.createPost));
  }

  fetchSimilarPostsAction(id: string, limit = 10): Observable<Post[]> {
    return this.apollo.query({ query: SIMILAR_POSTS_QUERY, variables: { id, limit }, fetchPolicy: 'no-cache' })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.similarPosts));
  }

  likeArticle(userId: string, postId: string) {
    return this.apollo
      .mutate({ mutation: LIKE_CREATE_MUTATION, variables: { user: userId, post: postId, type: 'like' } })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.createOpinion.opinion));
  }

  removeLikeArticle(postId: string) {
    return this.apollo
      .mutate({ mutation: LIKE_REMOVE_MUTATION, variables: { id: postId } })
      .pipe(map(res => this.responseService.formatResponseObjects(res)), map((result: any) => result.data.deleteOpinion.opinion));
  }
}
