import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { TopUsers, UrlUtilsService, User, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-top-popular-users',
  templateUrl: './top-popular-users.component.html',
  styleUrls: ['./top-popular-users.component.scss']
})
export class TopPopularUsersComponent implements OnInit {
  top5Likes = {} as unknown as TopUsers;

  constructor(private store: Store, private url: UrlUtilsService) {
  }

  ngOnInit(): void {
    this.store.select(UserInfoState.topPopularUsers).subscribe(topPopular => this.top5Likes = topPopular);
  }

  getUserAvatar(user: User) {
    return this.url.getUserImage(user);
  }

  getTopLikeByIndex(i: number): string | number {
    if (this.top5Likes && this.top5Likes.values) {
      return this.top5Likes.values[i];
    }
    return '';
  }
}
