import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';

import { LogoutAction, AuthState, User } from '@dcs-libs/shared';
import { environment } from '../../../../environments/environment';
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
    private location: Location
  ) {}

  ngOnInit() {
    ROUTES.forEach(newRoute => {
      const accessTemp = ACCESS.find(a => a.id === newRoute.accessId);

      // to evit duplicated links
      if (accessTemp.route.findIndex(r => r === newRoute) < 0) {
        accessTemp.route.push(newRoute);
      }
    });

    // order by access id
    this.menuAccess = ACCESS.sort((a, b) => a.id - b.id);

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
    if (this.me && this.me.avatar && this.me.avatar.url) {
      return `${environment.apiUrl}${this.me.avatar.url}`;
    }
    return 'assets/images/noavatar.png';
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
