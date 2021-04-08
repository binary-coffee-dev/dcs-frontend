import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchTopActiveUsersAction, FetchTopPopularUsersAction, TopUsers, UserInfoState } from '@dcs-libs/shared';

@Component({
  selector: 'app-user',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {


  top5Post = {} as TopUsers;
  top5Likes = {} as TopUsers;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(UserInfoState.topPopularUsers).subscribe(topPopular => this.top5Likes = topPopular);
    this.store.select(UserInfoState.topActiveUsers).subscribe(topActive => this.top5Post = topActive);

    this.store.dispatch(new FetchTopActiveUsersAction());
    this.store.dispatch(new FetchTopPopularUsersAction());
  }

  filterUser() {

  }

  getUserAvatar() {
    return 'assets/images/noavatar.png';
  }

}
