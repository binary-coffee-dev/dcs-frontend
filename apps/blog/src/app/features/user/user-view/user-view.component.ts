import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import {
  UrlUtilsService,
  MomentService,
  Post,
  PostState, User, NextPageAction, PreviousPageAction, WINDOW, ENVIRONMENT, Environment
} from '@dcs-libs/shared';

interface UserData {
  icon: string;
  link: string;
  text: string;
  action: Function;
}

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

  userData: UserData[] = [];

  firstPage: Observable<boolean>;
  lastPage: Observable<boolean>;

  constructor(
    private store: Store,
    public moment: MomentService,
    public url: UrlUtilsService,
    private route: ActivatedRoute,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private environment: Environment,
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

    this.createUserData();
  }

  createUserData() {
    console.log(this.user);
    this.userData.push({
      icon: 'email',
      text: 'private'
    } as UserData);
    this.userData.push({
      icon: 'language',
      link: this.user?.page
    } as UserData);
    this.userData.push({
      icon: 'rss_feed',
      action: this.copyRSSToClipboard.bind(this),
      text: 'RSS'
    } as UserData);
  }

  getUserAvatar(user) {
    return this.url.getUserImage(user);
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

  copyRSSToClipboard() {
    console.log(this.getUserRSSLink());
    this.window.navigator.clipboard.writeText(this.getUserRSSLink());
  }

  getUserRSSLink() {
    return `${this.environment.apiUrl}posts/feed/${this.user.username}/json`;
  }
}
