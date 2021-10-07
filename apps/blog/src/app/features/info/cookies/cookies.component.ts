import { Component, OnInit } from '@angular/core';

import { cookiesInfo } from './cookies.info';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent implements OnInit {

  info = cookiesInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
