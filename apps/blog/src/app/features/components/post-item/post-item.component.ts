import { Component, Input, inject } from '@angular/core';

import { MomentService, Post, UrlUtilsService } from '@dcs-libs/shared';
import { ResourceService } from '../../../core/services';

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.scss'],
    standalone: false
})
export class PostItemComponent {
  moment = inject(MomentService);
  url = inject(UrlUtilsService);
  private resource = inject(ResourceService);

  @Input()
  post: Post = {} as unknown as Post;

  getPostBanner(post: Post) {
    if (post && post.banner && post.banner.url) {
      return this.resource.addApiUrl(post.banner.url);
    }
    return "";
  }

  public stopPropagation(event: any) {
    event.stopPropagation();
  }

  onBannerImgError() {
    this.post = {...this.post, banner: undefined};
  }

  onAuthorImgError(): void {
    if (this.post.author && this.post.author.avatarUrl) {
      delete this.post.author.avatarUrl;
    }
  }
}
