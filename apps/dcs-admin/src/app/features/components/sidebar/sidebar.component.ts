import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngxs/store';

import { LogoutAction } from '@dcs-libs/shared';
import { environment } from '../../../../environments/environment';

declare interface Access {
  active: boolean;
  icon: string;
  title: string;
  route: RouteInfo[];
}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export let ROUTES: RouteInfo[] = [
  { path: '/articles', title: 'Artículos', icon: '', class: '' },
  { path: '/files', title: 'Archivos', icon: '', class: '' },
  { path: '/user-profile', title: 'Perfil', icon: '', class: '' },
  { path: '/dashboard', title: 'Dashboard', icon: '', class: '' }
];

export let ACCEESS: Access[] = [
  { active: true, title: 'Tablero', icon: 'fa fa-dashboard', route: [] },
  { active: false, title: 'Usuario', icon: 'fa fa-user-circle', route: [] }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuAccess: Access[];
  @Output()
  routeChange = new EventEmitter<any>();

  constructor(
    private store: Store,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    ACCEESS[0].route = ROUTES.map(route => route).splice(0, 2);
    ACCEESS[1].route = ROUTES.map(route => route).splice(2, 3);
    this.menuAccess = ACCEESS.filter(menuAccess => menuAccess);
  }

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  getSiteUrl() {
    return environment.siteUrl; //+ '/admin';
  }

  setAccess(item: Access) {
    this.menuAccess.forEach(element => {
      if (element != item) element.active = false;
      else element.active = true;
    });
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
