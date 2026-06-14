import { Component, input } from '@angular/core';

import { Tag } from '@dcs-libs/shared';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  standalone: false,
})
export class TagsComponent {
  tags = input<Tag[]>([]);
}
