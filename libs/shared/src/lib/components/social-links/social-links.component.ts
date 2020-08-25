import { Component, Input } from '@angular/core';

import { SocialLink } from './social-link.model';
import { links } from './links-data';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent {

  @Input()
  footer = false;

  links: SocialLink[] = links;

  constructor() {
  }
}
