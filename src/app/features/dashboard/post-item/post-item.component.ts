import {Component, Input, OnInit} from '@angular/core';

import { truncate } from 'lodash';

import {Post} from '../../../core/redux/models';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input()
  post: Post;

  constructor() { }

  truncatePostDescription(t: string) {
    return truncate(t, {length: 300});
  }

}
