import { Component, OnInit, Input } from '@angular/core';

import { SocialLink } from './social-link.model';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent implements OnInit {

  @Input()
  dir: string;

  links: SocialLink[];

  constructor() { }

  ngOnInit(): void {
    this.links = [
      {
        enabled: true,
        title: 'Facebook Page',
        href: 'https://facebook.com/Binary-Coffee-111577483710684/',
        icon: 'fa fa-facebook-official'
      },
      {
        enabled: true,
        title: 'DC\'s Comunity',
        href: 'https://github.com/dcs-community/',
        icon: 'fa fa-github'
      },
      {
        enabled: true,
        title: 'Twitter Page',
        href: 'https://twitter.com/CoffeeBinary/',
        icon: 'fa fa-twitter'
      },
      {
        enabled: false,
        title: 'LinkedIn Page',
        href: 'https://www.linkedin.com/company/binarycoffee/',
        icon: 'fa fa-linkedin'
      },
      {
        enabled: false,
        title: 'Instagram Page',
        href: 'https://www.instagram.com/binarycoffee.dev/',
        icon: 'fa fa-instagram'
      },
      {
        enabled: false,
        title: 'BinaryCoffee Chanel',
        href: 'https://www.youtube.com/channel/UCmiGV-Amt7e4plFIxKH_v_g',
        icon: 'fa fa-youtube-play'
      },
      {
        enabled: true,
        title: 'Telegram Chanel',
        href: 'https://t.me/binarycoffeedev',
        icon: 'fa fa-telegram'
      }
    ];
  }
}
