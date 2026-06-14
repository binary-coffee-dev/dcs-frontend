import { Component, input, signal } from '@angular/core';

import { SocialLink } from './social-link.model';
import { links } from './links-data';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
  standalone: false,
})
export class SocialLinksComponent {
  footer = input<boolean>(false);

  links = signal<SocialLink[]>(links);
}
