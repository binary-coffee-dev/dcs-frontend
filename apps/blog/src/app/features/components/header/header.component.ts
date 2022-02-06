import { Component, Inject, OnInit } from '@angular/core';

import { ENVIRONMENT, Environment, WINDOW } from '@dcs-libs/shared';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showSearch = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) public env: Environment) {
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(evt => evt instanceof NavigationEnd),
        map(() => {
          let child = this.route.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['isHome']) {
              return child.snapshot.data['isHome'];
            } else {
              return null;
            }
          }
          return null;
        }))
      .subscribe(isHome => {
        this.showSearch = !!isHome;
      });
  }
}
