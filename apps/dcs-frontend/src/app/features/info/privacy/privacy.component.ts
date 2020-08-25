import { Component, OnInit } from '@angular/core';

import { privacyInfo } from './privacy.info';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent implements OnInit {

  info = privacyInfo;

  constructor() {
  }

  ngOnInit(): void {
  }

}
