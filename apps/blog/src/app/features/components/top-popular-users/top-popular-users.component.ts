import { Component, OnInit, inject, signal } from '@angular/core';

import { Store } from '@ngxs/store';

import { TopUsers, UrlUtilsService, User, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-top-popular-users',
  templateUrl: './top-popular-users.component.html',
  styleUrls: ['./top-popular-users.component.scss'],
  standalone: false
})
export class TopPopularUsersComponent implements OnInit {
  private store = inject(Store);
  url = inject(UrlUtilsService);

  top5Likes = signal<TopUsers | null>(null);

  ngOnInit(): void {
    this.store
      .select(UserInfoState.topPopularUsers)
      .subscribe((topPopular) => this.top5Likes.set({ ...topPopular }));
  }

  onUserImgError(index: number): void {
    this.top5Likes.update((top5Likes: TopUsers | null): TopUsers | null => {
      if (top5Likes) {
        return {
          ...top5Likes,
          users: top5Likes?.users?.map((user: User, i: number): User => {
            if (i == index) {
              return { ...user, avatarUrl: undefined } as User;
            }
            return user;
          })
        } as TopUsers;
      }
      return top5Likes;
    });
  }

  getUserAvatar(user: User): string {
    return this.url.getUserImage(user);
  }

  getTopLikeByIndex(i: number): string | number {
    return this.top5Likes()?.values?.[i] ?? '';
  }
}
