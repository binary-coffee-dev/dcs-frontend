import {Component, Inject, OnInit} from '@angular/core';

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
  UrlUtilsService, Permissions, AuthState, ConfigState, SetConfigAction, SetFiltersAction, User, Where
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

  tableOrCard = false;

  constructor(
    private store: Store,
    public moment: MomentService,
    @Inject(ENVIRONMENT) private environment: Environment,
    public url: UrlUtilsService
  ) {
    super();
  }

  ngOnInit() {
    const me = this.meUser();
    this.store.dispatch(new SetFiltersAction({author: me.id} as Where)).subscribe(() => {
      this.store.dispatch(new FetchPostsAction());
    });
    this.store.select(PostState.posts).subscribe(posts => {
      this.posts = posts || [];
    });
    this.store.select(PostState.pageIndicator).subscribe(indicator => {
      if (indicator) {
        this.currentPage = indicator.page;
        this.numberOfPages = Math.ceil(indicator.count / indicator.pageSize);
      }
    });
    this.store.select(ConfigState.getConfigItem('dashboard-post-tableOrCard')).subscribe(value => this.tableOrCard = !!value);
  }

  isMyPost(post) {
    const user = this.meUser();
    return !!user && !!post.author && post.author.id === user.id;
  }

  meUser(): User {
    return this.store.selectSnapshot(AuthState.me);
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
    this.store.dispatch(new SetConfigAction('dashboard-post-tableOrCard', this.tableOrCard));
  }
}
