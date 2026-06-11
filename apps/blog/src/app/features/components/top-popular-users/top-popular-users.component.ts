import { Component, OnInit, inject } from '@angular/core';

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

  top5Likes = {} as unknown as TopUsers;

  ngOnInit(): void {
    this.store.select(UserInfoState.topPopularUsers).subscribe(topPopular => this.top5Likes = {...topPopular});
  }

  onUserImgError(index: number): void {
    this.top5Likes.users = this.top5Likes.users.map((user: User, i: number): User => {
      if (i == index) {
        return {...user, avatarUrl: undefined} as User;
      }
      return user;
    });
  }

  getUserAvatar(user: User): string {
    return this.url.getUserImage(user);
  }

  getTopLikeByIndex(i: number): string | number {
    if (this.top5Likes && this.top5Likes.values) {
      return this.top5Likes.values[i];
    }
    return '';
  }
}
