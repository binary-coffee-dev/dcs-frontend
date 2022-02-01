import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';

import { LogoutAction, AuthState, User, UrlUtilsService } from '@dcs-libs/shared';
import { ROUTES, RouteInfo } from './sidebar.model';

const PATH_NAME_POSITION = 2;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output()
  routeChange = new EventEmitter<void>();

  me: User;

  menuAccess: RouteInfo[];
  currentRoute = '';

  constructor(
    private store: Store,
    private router: Router,
    private location: Location,
    private url: UrlUtilsService
  ) {
  }

  ngOnInit() {

    this.menuAccess = ROUTES
      .filter(v => v.visible);

    this.store.select(AuthState.me).subscribe((me: User) => {
      if (me) {
        this.me = me;
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.extractCurrentLocation();
      }
    })
    this.currentRoute = this.extractCurrentLocation();
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
  }

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  extractCurrentLocation() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    title = title.split('/').reduce((p, v, i) => {
      if (i >= PATH_NAME_POSITION) {
        return `${p}/${v}`;
      }
      return p;
    }, '');
    return title;
  }
}
