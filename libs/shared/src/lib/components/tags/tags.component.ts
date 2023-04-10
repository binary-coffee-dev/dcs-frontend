import { Component, Input } from '@angular/core';

import { Tag } from '@dcs-libs/shared';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {

  @Input()
  tags?: Tag[] = [];

  constructor() { }
}
