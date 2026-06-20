import { Component, OnInit, inject, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';
import { mergeMap } from 'rxjs';

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
  UrlUtilsService,
  Permissions,
  AuthState,
  ConfigState,
  SetConfigAction,
  SetFiltersAction,
  User,
  Where
} from '@dcs-libs/shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent extends Permissions {
  private store = inject(Store);
  private environment = inject<Environment>(ENVIRONMENT);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);

  posts = toSignal(this.store.select(PostState.posts));

  pageIndicator = toSignal(this.store.select(PostState.pageIndicator));
  currentPage = computed(() => this.pageIndicator()?.page ?? 0);
  numberOfPages = computed(() => {
    const pageIndicator = this.pageIndicator();
    if (pageIndicator) {
      return Math.ceil(pageIndicator.count / pageIndicator.pageSize);
    }
    return 0;
  });

  tableOrCardStore = toSignal(
    this.store.select(ConfigState.getConfigItem('dashboard-post-tableOrCard'))
  );
  tableOrCard = computed(() => Boolean(this.tableOrCardStore()));

  me = toSignal(this.store.select(AuthState.me));

  constructor() {
    super();

    effect(() => {
      const me = this.me();
      this.store
        .dispatch(
          new SetFiltersAction({
            author: { id: { eq: me?.id } },
            state: 'PREVIEW'
          } as Where)
        )
        .pipe(mergeMap(() => this.store.dispatch(new FetchPostsAction())));
    });
  }

  isMyPost(post: Post, user: User | undefined) {
    return (user?.id ?? false) && (post?.author?.id ?? false) && post?.author?.id === user?.id;
  }

  nextPageEvent() {
    this.store.dispatch(new NextPageAction());
  }

  previousPageEvent() {
    this.store.dispatch(new PreviousPageAction());
  }

  selectPageEvent(page: number) {
    this.store.dispatch(new SelectPageAction(page));
  }

  openArticle(post: Post) {
    window.open(`${this.environment.siteUrl}/post/${post.name}`);
  }

  toggleTableCard() {
    this.store.dispatch(new SetConfigAction('dashboard-post-tableOrCard', this.tableOrCard));
  }
}
