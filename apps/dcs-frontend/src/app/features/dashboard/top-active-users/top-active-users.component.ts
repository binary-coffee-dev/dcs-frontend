import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { FetchTopActiveUsersAction, FetchTopPopularUsersAction, FetchUsersAction, TopUsers, User, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-top-active-users',
  templateUrl: './top-active-users.component.html',
  styleUrls: ['./top-active-users.component.scss']
})
export class TopActiveUsersComponent implements OnInit {
  top5Post = {} as TopUsers;
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(UserInfoState.topActiveUsers).subscribe(topActive => this.top5Post = topActive);
    this.store.dispatch(new FetchTopActiveUsersAction());
  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }
}
