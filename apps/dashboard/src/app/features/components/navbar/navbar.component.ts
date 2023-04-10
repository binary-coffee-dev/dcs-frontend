import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';

import { AuthState, Environment, ENVIRONMENT, UrlUtilsService, User } from '@dcs-libs/shared';
import { ROUTES } from '../sidebar/sidebar.model';

const PATH_NAME_POSITION = 2;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[] = [];
  me: User | undefined = {} as unknown as User;

  @Output()
  openSidenav = new EventEmitter<void>();

  constructor(
    private location: Location,
    @Inject(ENVIRONMENT) private env: Environment,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.store.select(AuthState.me).subscribe(me => this.me = me);
  }

  getBlogUrl() {
    return this.env.siteUrl;
  }

  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    title = '/' + title.split('/')[PATH_NAME_POSITION];
    for (const item of this.listTitles) {
      if (item.path === title) {
        return item.title;
      }
    }
    return 'Binary Coffee';
  }
}
