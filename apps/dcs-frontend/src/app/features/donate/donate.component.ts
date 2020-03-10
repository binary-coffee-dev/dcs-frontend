import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {BitcoinComponent} from './bitcoin/bitcoin.component';
import {ScrollService} from '../../core/services';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {

  constructor(private dialog: MatDialog, private scroll: ScrollService) {
  }

  ngOnInit() {
    this.scroll.smoothScroll();
  }

  openBitcoinDialog() {
    this.dialog.open(BitcoinComponent);
  }

}
