import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Store } from '@ngxs/store';

import { ROUTES } from '../sidebar/sidebar.model';

const PATH_NAME_POSITION = 2;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  showProfileDropdown = false;

  @Output()
  openSidenav = new EventEmitter<any>();

  constructor(private location: Location) {}

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
