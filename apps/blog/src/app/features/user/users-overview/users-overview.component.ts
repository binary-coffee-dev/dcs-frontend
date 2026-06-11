import { Component, OnInit, inject } from '@angular/core';

import { Store } from '@ngxs/store';

import {
  FetchUsersAction,
  UrlUtilsService,
  User,
  UserInfoState
} from '@dcs-libs/shared';

@Component({
    selector: 'app-user',
    templateUrl: './user-overview.component.html',
    styleUrls: ['./user-overview.component.scss'],
    standalone: false
})
export class UsersOverviewComponent implements OnInit {
  private store = inject(Store);
  private url = inject(UrlUtilsService);


  users: User[] = [];

  ngOnInit(): void {
    this.store.select(UserInfoState.users)
      .subscribe(users => this.users = users ? users.map(u => ({...u})) : []);
  }

  handlerAvatarImgError(index: number): void {
    this.users[index].avatarUrl = undefined;
  }

  filterUser(event: any): void {
    this.store.dispatch(new FetchUsersAction(event.target.value));
  }

  getUserAvatar(user: User): string {
    return this.url.getUserImage(user);
  }

}
