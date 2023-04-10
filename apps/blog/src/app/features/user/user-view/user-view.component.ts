import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { Observable, of } from 'rxjs';

import {
  UrlUtilsService,
  MomentService,
  Post,
  PostState, User, NextPageAction, PreviousPageAction, WINDOW, ENVIRONMENT, Environment
} from '@dcs-libs/shared';

interface UserData {
  type: 'link' | 'button' | 'data';
  icon: string;
  link?: string;
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

  firstPage: Observable<boolean> = of(true);
  lastPage: Observable<boolean> = of(true);

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
    this.user = this.route.snapshot.data['userInfo'].user;
    this.posts = this.route.snapshot.data['userInfo'].posts;
    this.count = this.route.snapshot.data['userInfo'].count;
    this.commentsCount = this.route.snapshot.data['userInfo'].commentsCount;

    this.store.select(PostState.posts).subscribe((posts) => this.posts = posts || this.posts);
    this.firstPage = this.store.select(PostState.firstPage);
    this.lastPage = this.store.select(PostState.lastPage);

    this.createUserData();
  }

  createUserData() {
    this.userData.push({
      type: 'data',
      icon: 'email',
      text: 'private'
    } as UserData);
    this.userData.push({
      type: 'link',
      icon: 'language',
      link: this.user?.page
    } as UserData);
    this.userData.push({
      type: 'button',
      icon: 'rss_feed',
      action: this.copyRSSToClipboard.bind(this),
      text: 'RSS'
    } as UserData);
    console.log(this.userData);
  }

  getUserAvatar(user: User) {
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
    this.window.navigator.clipboard.writeText(this.getUserRSSLink());
  }

  getUserRSSLink() {
    return `${this.environment.apiUrl}posts/feed/${this.user.username}/json`;
  }
}
