import { Component, Input } from '@angular/core';

import { Post, UrlUtilsService } from '@dcs-libs/shared';
import { MomentService, ResourceService } from '../../../core/services';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input()
  post: Post;

  constructor(
    public moment: MomentService,
    public url: UrlUtilsService,
    private resource: ResourceService
  ) {
  }

  getPostBanner(post: Post) {
    if (post && post.banner && post.banner.url) {
      return this.resource.addApiUrl(post.banner.url);
    }
    return '/assets/images/banner-default.jpg';
  }
}
