import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FetchSimilarPostsAction, Post, PostState } from '@dcs-libs/shared';
import { ResourceService } from '../../../core/services';

const MAX_NUMBER_OF_POSTS = 9;

@Component({
  selector: 'app-similar-posts-list',
  templateUrl: './similar-posts-list.component.html',
  styleUrls: ['./similar-posts-list.component.scss']
})
export class SimilarPostsListComponent implements OnInit {
  posts: Post[];
  private _postId: string;

  get postId(): string {
    return this._postId;
  }

  @Input()
  set postId(value: string) {
    if (value && value !== this._postId) {
      this.store.dispatch(new FetchSimilarPostsAction(value));
    }
    this._postId = value;
  }

  @Input()
  inside = false;

  constructor(private store: Store, private resource: ResourceService) {
  }

  ngOnInit(): void {
    this.store.select(PostState.similarPosts).subscribe((posts: Post[]) => {
      this.loadPosts(posts);
    });
  }

  loadPosts(posts: Post[]) {
    if (posts) {
      this.posts = [...posts].reduce((previousValue: Post[], currentValue, currentIndex) => {
        if (currentIndex < MAX_NUMBER_OF_POSTS) {
          previousValue.push(currentValue);
        }
        return previousValue;
      }, []);
    }
  }

  getPostBanner(post: Post) {
    if (post && post.banner && post.banner.url) {
      return this.resource.addApiUrl(post.banner.url);
    }
    return '/assets/images/banner-default.jpg';
  }
}
