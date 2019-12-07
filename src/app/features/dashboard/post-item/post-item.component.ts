import {Component, Input} from '@angular/core';

import {truncate} from 'lodash';

import {Post} from '../../../core/redux/models';
import {MomentService} from '../../../core/services';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input()
  post: Post;

  constructor(public moment: MomentService) {
  }

  truncatePostDescription(t: string) {
    return truncate(t, {length: 300});
  }

}
