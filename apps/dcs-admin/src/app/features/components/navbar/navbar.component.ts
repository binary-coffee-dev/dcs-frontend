import {Component, OnInit, ElementRef, Output, EventEmitter} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

import {Store} from '@ngxs/store';

import {ROUTES} from '../sidebar/sidebar.component';
import {LogoutAction} from '../../../core/redux/actions';

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

  constructor(
    private location: Location,
    private element: ElementRef,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    // toDo: inject window instance
    window.addEventListener('click', () => {
      this.showProfileDropdown = false;
    });
  }

  showDropdown(event) {
    this.showProfileDropdown = !this.showProfileDropdown;
    event.stopPropagation();
  }

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  getTitle() {
    let title = this.location.prepareExternalUrl(this.location.path());
    if (title.charAt(0) === '#') {
      title = title.slice(1);
    }
    title = '/' + title.split('/')[1];
    for (const item of this.listTitles) {
      if (item.path === title) {
        return item.title;
      }
    }
    return 'Dashboard';
  }
}
