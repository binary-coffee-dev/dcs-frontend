import { Component, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { TopUsers, UrlUtilsService, User, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-top-active-users',
  templateUrl: './top-active-users.component.html',
  styleUrls: ['./top-active-users.component.scss']
})
export class TopActiveUsersComponent implements OnInit {
  top5Post = {} as TopUsers;

  constructor(private store: Store, public url: UrlUtilsService) {
  }

  ngOnInit(): void {
    this.store.select(UserInfoState.topActiveUsers).subscribe(topActive => this.top5Post = {...topActive});
  }

  onUserImgError(index: number): void {
    this.top5Post.users = this.top5Post.users.map((user: User, i: number): User => {
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
    if (this.top5Post && this.top5Post.values) {
      return this.top5Post.values[i];
    }
    return '';
  }
}
