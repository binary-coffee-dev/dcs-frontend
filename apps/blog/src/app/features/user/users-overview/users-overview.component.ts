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

  users: User[] = [];

  constructor(private store: Store, private url: UrlUtilsService) {
  }

  ngOnInit(): void {
    this.store.select(UserInfoState.users).subscribe(users => this.users = users || []);
  }

  filterUser(event) {
    this.store.dispatch(new FetchUsersAction(event.target.value));
  }

  getUserAvatar(user) {
    return this.url.getUserImage(user);
  }

}
