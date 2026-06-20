import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';

import { ENVIRONMENT, WINDOW } from '@dcs-libs/shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public env = inject(ENVIRONMENT);

  showSearch = signal<boolean>(false);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
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
        })
      )
      .subscribe((isHome) => {
        this.showSearch.set(!!isHome);
      });
  }
}
