import { Component, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  FetchUsersAction,
  UrlUtilsService,
  User,
  UserInfoState,
} from '@dcs-libs/shared';

@Component({
  selector: 'app-user',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss'],
  standalone: false,
})
export class UsersOverviewComponent {
  private store = inject(Store);
  private url = inject(UrlUtilsService);

  usersStore = toSignal(this.store.select(UserInfoState.users), {
    initialValue: [],
  });
  users = linkedSignal({
    source: this.usersStore,
    computation: (users) => users,
  });

  handlerAvatarImgError(index: number): void {
    this.users.update((users) =>
      users.map((user, i) =>
        i === index ? { ...user, avatarUrl: undefined } : user
      )
    );
  }

  filterUser(event: KeyboardEvent): void {
    this.store.dispatch(
      new FetchUsersAction((event.target as HTMLInputElement).value)
    );
  }

  getUserAvatar(user: User): string {
    return this.url.getUserImage(user);
  }
}
