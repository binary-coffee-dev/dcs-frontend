import {Component, Inject, OnInit, Input} from '@angular/core';

import {Store} from '@ngxs/store';

import {
  ENVIRONMENT,
  Environment,
  FetchPostsAction,
  NextPageAction,
  Post,
  PostState,
  PreviousPageAction,
  SelectPageAction,
  MomentService,
  UrlUtilsService, Permissions, AuthState
} from '@dcs-libs/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends Permissions implements OnInit {
  posts: Post[];

  currentPage = 0;
  numberOfPages = 0;

  tableOrCard = true;

  constructor(
    private store: Store,
    public moment: MomentService,
    @Inject(ENVIRONMENT) private environment: Environment,
    public url: UrlUtilsService
  ) {
    super();
  }

  ngOnInit() {
    this.store.select(PostState.posts).subscribe(posts => {
      this.posts = posts || [];
    });
    this.store.dispatch(new FetchPostsAction());
    this.store.select(PostState.pageIndicator).subscribe(indicator => {
      if (indicator) {
        this.currentPage = indicator.page;
        this.numberOfPages = Math.ceil(indicator.count / indicator.pageSize);
      }
    });
  }

  isMyPost(post) {
    const user = this.store.selectSnapshot(AuthState.me);
    return !!user && !!post.author && post.author.id === user.id;
  }

  nextPageEvent() {
    this.store.dispatch(new NextPageAction());
  }

  previousPageEvent() {
    this.store.dispatch(new PreviousPageAction());
  }

  selectPageEvent(page) {
    this.store.dispatch(new SelectPageAction(page));
  }

  openArticle(post: Post) {
    window.open(`${this.environment.siteUrl}/post/${post.name}`);
  }

  toggleTableCard() {
    this.tableOrCard = !this.tableOrCard;
  }
}
