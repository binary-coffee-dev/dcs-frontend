import { Component, inject, output, signal, computed } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { LogoutAction, AuthState, UrlUtilsService } from '@dcs-libs/shared';
import { ROUTES, RouteInfo } from './sidebar.model';

const PATH_NAME_POSITION = 2;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: false
})
export class SidebarComponent {
  private store = inject(Store);
  private router = inject(Router);
  private location = inject(Location);
  private url = inject(UrlUtilsService);

  routeChange = output<void>();

  me = toSignal(this.store.select(AuthState.me), { initialValue: null });
  menuAccess = signal<RouteInfo[]>(ROUTES.filter((v) => v.visible));
  routerEvents = toSignal(this.router.events);
  currentRoute = computed(() => {
    if (this.routerEvents() instanceof NavigationEnd) {
      return this.extractCurrentLocation();
    }
    return this.extractCurrentLocation();
  });

  getUserImage = computed(() => {
    return this.url.getUserImage(this.me());
  });

  logout() {
    this.store.dispatch(new LogoutAction()).subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  extractCurrentLocation(): string {
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
