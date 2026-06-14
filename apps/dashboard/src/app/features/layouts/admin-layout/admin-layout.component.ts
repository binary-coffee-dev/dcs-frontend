import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  inject,
  signal,
  effect,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
  standalone: false,
})
export class AdminLayoutComponent implements OnDestroy {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private media = inject(MediaMatcher);

  mobileQuery = signal<MediaQueryList>(
    this.media.matchMedia('(max-width: 600px)')
  );
  showSidenav = signal<boolean>(false);

  private readonly _mobileQueryListener: () => void;

  constructor() {
    this._mobileQueryListener = () => this.changeDetectorRef.detectChanges();
    effect(() => {
      this.mobileQuery().addEventListener('change', this._mobileQueryListener);
    });
  }

  ngOnDestroy(): void {
    if (this.mobileQuery()?.removeEventListener) {
      this.mobileQuery().removeEventListener(
        'change',
        this._mobileQueryListener
      );
    }
  }
}
