import {Component, Input, OnInit} from '@angular/core';
import {FetchSimilarPostsAction, Post, PostState} from '@dcs-libs/shared';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-similar-posts-list',
  templateUrl: './similar-posts-list.component.html',
  styleUrls: ['./similar-posts-list.component.scss']
})
export class SimilarPostsListComponent implements OnInit {
  private posts: Post[];
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

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(PostState.similarPosts).subscribe(posts => this.posts = posts);
  }
}
