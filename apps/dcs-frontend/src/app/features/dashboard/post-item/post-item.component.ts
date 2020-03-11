import {Component, Input} from '@angular/core';

import {truncate} from 'lodash';

import {Post} from '@dcs-libs/shared';
import {MomentService, ResourceService} from '../../../core/services';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input()
  post: Post;

  @Input()
  number: number;

  constructor(
    public moment: MomentService,
    public resource: ResourceService
  ) {
  }

  truncatePostDescription(t: string) {
    return truncate(t, {length: 300});
  }

}
