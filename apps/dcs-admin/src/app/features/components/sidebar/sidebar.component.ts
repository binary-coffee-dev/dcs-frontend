import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';

import {LogoutAction, AuthState, User, UrlUtilsService} from '@dcs-libs/shared';
import { Access, AccessIds, ROUTES, ACCESS } from './sidebar.model';

const PATH_NAME_POSITION = 2;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuAccess: Access[];
  me: User;

  @Output()
  routeChange = new EventEmitter<any>();

  constructor(
    private store: Store,
    private router: Router,
    private location: Location,
    private url: UrlUtilsService
  ) {}

  ngOnInit() {
    // fill all router of the access
    ROUTES.forEach(newRoute => {
      const accessTemp = ACCESS.find(a => a.id === newRoute.accessId);

      // to evit duplicated links
      if (accessTemp.route.findIndex(r => r === newRoute) < 0) {
        // only add the visible route
        if (newRoute.visible) {
          accessTemp.route.push(newRoute);
        }
      }
    });

    // order by access id
    // get only the visible access
    this.menuAccess = ACCESS.filter(a => a.visible === true).sort(
      (a, b) => a.id - b.id
    );

    this.store.select(AuthState.me).subscribe((me: User) => {
      if (me) {
        this.me = me;
        const userMenu = this.menuAccess.find(m => m.id === AccessIds.USER);
        userMenu.img = this.getUserImage();
        userMenu.title = me.username;
      }
    });
  }

  getUserImage() {
    return this.url.getUserImage(this.me);
  }

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  setAccess(item: Access) {
    this.menuAccess.forEach(element => {
      element.active = element === item;
    });
  }

  getLocation() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    title = '/' + title.split('/')[PATH_NAME_POSITION];
    return title;
  }
}
