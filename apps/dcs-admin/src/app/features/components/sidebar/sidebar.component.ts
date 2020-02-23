import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {Store} from '@ngxs/store';

import {LogoutAction} from '../../../core/redux/actions';
import {environment} from '../../../../environments/environment';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
  {path: '/articles', title: 'Articles', icon: 'content_paste', class: ''},
  {path: '/files', title: 'Files', icon: 'library_books', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[];
  @Output()
  routeChange = new EventEmitter<any>();

  constructor(
    private store: Store,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  getSiteUrl() {
    return environment.siteUrl + '/admin';
  }

  getLocation() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    title = '/' + title.split('/')[1];
    return title;
  }
}
