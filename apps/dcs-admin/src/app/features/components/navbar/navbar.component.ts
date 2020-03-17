import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {Location} from '@angular/common';

import {Environment, ENVIRONMENT} from '@dcs-libs/shared';
import {ROUTES} from '../sidebar/sidebar.model';

const PATH_NAME_POSITION = 2;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];

  @Output()
  openSidenav = new EventEmitter<any>();

  constructor(
    private location: Location,
    @Inject(ENVIRONMENT) private env: Environment
  ) {
  }

  getBlogUrl() {
    return this.env.siteUrl;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
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
