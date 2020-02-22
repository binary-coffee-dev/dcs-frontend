import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Store} from '@ngxs/store';

import {LogoutAction} from '../../../core/redux/actions';
import {environment} from '../../../../environments/environment';

declare const $: any;

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
  menuItems: any[];

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
    return $(window).width() <= 991;
  };

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  getSiteUrl() {
    return environment.siteUrl + '/admin';
  }
}
