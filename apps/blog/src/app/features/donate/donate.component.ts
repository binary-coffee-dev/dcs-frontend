import { Component, OnInit, inject } from '@angular/core';

import { ScrollService } from '../../core/services';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss'],
  standalone: false
})
export class DonateComponent implements OnInit {
  private scroll = inject(ScrollService);

  ngOnInit() {
    this.scroll.smoothScroll();
  }
}
