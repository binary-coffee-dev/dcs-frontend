import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  FetchTopActiveUsersAction,
  FetchTopPopularUsersAction,
  FetchUsersAction,
  TopUsers,
  UrlUtilsService,
  User,
  UserInfoState
} from '@dcs-libs/shared';

@Component({
  selector: 'app-user',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UsersOverviewComponent implements OnInit {

  top5Post = {} as TopUsers;
  top5Likes = {} as TopUsers;

  users: User[] = [];

  constructor(private store: Store, private url: UrlUtilsService) {
  }

  ngOnInit(): void {
    this.store.select(UserInfoState.topPopularUsers).subscribe(topPopular => this.top5Likes = topPopular);
    this.store.select(UserInfoState.topActiveUsers).subscribe(topActive => this.top5Post = topActive);
    this.store.select(UserInfoState.users).subscribe(users => this.users = users);

    this.store.dispatch(new FetchTopActiveUsersAction());
    this.store.dispatch(new FetchTopPopularUsersAction());
    this.store.dispatch(new FetchUsersAction(''));
  }

  filterUser(event) {
    this.store.dispatch(new FetchUsersAction(event.target.value));
  }

  getUserAvatar(user) {
    return this.url.getUserImage(user);
  }

}
