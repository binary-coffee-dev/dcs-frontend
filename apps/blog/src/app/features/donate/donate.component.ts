import { Component, OnInit } from '@angular/core';

import { ScrollService } from '../../core/services';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  constructor(private scroll: ScrollService) {
  }

  ngOnInit() {
    this.scroll.smoothScroll();
  }
}
