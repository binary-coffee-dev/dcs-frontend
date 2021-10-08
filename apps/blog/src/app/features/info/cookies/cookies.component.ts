import { Component } from '@angular/core';

import { cookiesInfo } from './cookies.info';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.scss']
})
export class CookiesComponent {

  info = cookiesInfo;
}
