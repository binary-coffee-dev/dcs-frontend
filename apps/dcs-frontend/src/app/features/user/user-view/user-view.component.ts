import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import {
  UrlUtilsService,
  MomentService,
  Post,
  PostState, User, NextPageAction, PreviousPageAction
} from '@dcs-libs/shared';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  user = {} as User;
  posts: Post[] = [];
  count = 0;
  commentsCount = 0;

  firstPage: Observable<boolean>;
  lastPage: Observable<boolean>;

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.user = this.route.snapshot.data.userInfo.user;
    this.posts = this.route.snapshot.data.userInfo.posts;
    this.count = this.route.snapshot.data.userInfo.count;
    this.commentsCount = this.route.snapshot.data.userInfo.commentsCount;

    this.store.select(PostState.posts).subscribe((posts) => this.posts = posts || this.posts);
    this.firstPage = this.store.select(PostState.firstPage);
    this.lastPage = this.store.select(PostState.lastPage);
  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }

  getPostImg() {
    return 'assets/images/banner-default.jpg';
  }

  articlesNextPage() {
    this.store.dispatch(new NextPageAction());
  }

  articlesPreviousPage() {
    this.store.dispatch(new PreviousPageAction());
  }
}
