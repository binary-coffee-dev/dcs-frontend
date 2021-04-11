import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FetchTopPopularUsersAction, TopUsers, UrlUtilsService, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-top-popular-users',
  templateUrl: './top-popular-users.component.html',
  styleUrls: ['./top-popular-users.component.scss']
})
export class TopPopularUsersComponent implements OnInit {
  top5Likes = {} as TopUsers;
  constructor(private store: Store, private url: UrlUtilsService) { }

  ngOnInit(): void {
    this.store.select(UserInfoState.topPopularUsers).subscribe(topPopular => this.top5Likes = topPopular);
    this.store.dispatch(new FetchTopPopularUsersAction());
  }

  getUserAvatar(user) {
    return this.url.getUserImage(user);
  }

}
