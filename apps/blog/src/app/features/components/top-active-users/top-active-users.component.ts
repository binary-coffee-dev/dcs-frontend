import { Component, OnInit, inject, signal } from '@angular/core';

import { Store } from '@ngxs/store';

import {
  TopUsers,
  UrlUtilsService,
  User,
  UserInfoState,
} from '@dcs-libs/shared';

@Component({
  selector: 'app-top-active-users',
  templateUrl: './top-active-users.component.html',
  styleUrls: ['./top-active-users.component.scss'],
  standalone: false,
})
export class TopActiveUsersComponent implements OnInit {
  private store = inject(Store);
  url = inject(UrlUtilsService);

  top5Post = signal<TopUsers | null>(null);

  ngOnInit(): void {
    this.store
      .select(UserInfoState.topActiveUsers)
      .subscribe((topActive) => this.top5Post.set({ ...topActive }));
  }

  onUserImgError(index: number): void {
    this.top5Post.update((top5Post: TopUsers | null): TopUsers | null => {
      if (top5Post) {
        return {
          ...(top5Post ?? {}),
          users:
            top5Post?.users?.map((user: User, i: number): User => {
              if (i == index) {
                return { ...user, avatarUrl: undefined } as User;
              }
              return user;
            }) ?? [],
        } as TopUsers;
      }
      return top5Post;
    });
  }

  getUserAvatar(user: User): string {
    return this.url.getUserImage(user);
  }

  getTopLikeByIndex(i: number): string | number {
    return this.top5Post()?.values?.[i] ?? '';
  }
}
