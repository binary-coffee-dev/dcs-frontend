import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  UrlUtilsService,
  MomentService,
  PostState,
  User,
  WINDOW,
  ENVIRONMENT,
  Environment
} from '@dcs-libs/shared';
import { UserView } from './user-view.resolver';

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
  styleUrls: ['./user-view.component.scss'],
  standalone: false
})
export class UserViewComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private window = inject<Window>(WINDOW);
  private environment = inject<Environment>(ENVIRONMENT);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);

  routeData = toSignal(this.route.data);
  userInfo = computed<UserView | null>(() => this.routeData()?.['userInfo']);

  user = computed(() => this.userInfo()?.user);
  count = computed(() => this.userInfo()?.count ?? 0);
  commentsCount = computed(() => this.userInfo()?.commentsCount ?? 0);
  posts = toSignal(this.store.select(PostState.posts), { initialValue: [] });

  userData = computed(() => {
    const userPage = this.user()?.page;
    if (userPage) {
      return [
        {
          type: 'data',
          icon: 'email',
          text: 'private'
        } as UserData,
        {
          type: 'link',
          icon: 'language',
          link: userPage
        } as UserData,
        {
          type: 'button',
          icon: 'rss_feed',
          action: this.copyRSSToClipboard.bind(this),
          text: 'RSS'
        } as UserData
      ];
    }
    return [];
  });

  firstPage = toSignal(this.store.select(PostState.firstPage));
  lastPage = toSignal(this.store.select(PostState.lastPage));
  getUserRSSLink = computed(() => {
    return `${this.environment.apiUrl}api/posts/feed/${this.user()?.username}/json`;
  });

  getUserAvatar(user: User | undefined): string {
    if (!user) {
      return '';
    }
    return this.url.getUserImage(user);
  }

  copyRSSToClipboard() {
    this.window.navigator.clipboard.writeText(this.getUserRSSLink());
  }
}
