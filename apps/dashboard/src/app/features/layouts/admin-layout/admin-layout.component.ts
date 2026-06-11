import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    standalone: false
})
export class AdminLayoutComponent implements OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);

  mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  showSidenav = false;

  constructor() {
    const changeDetectorRef = this.changeDetectorRef;
    const media = this.media;

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    if (this.mobileQuery?.removeEventListener) {
      this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }
  }
}
