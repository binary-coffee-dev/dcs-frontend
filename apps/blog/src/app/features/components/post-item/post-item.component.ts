import { Component, Input, inject, input, linkedSignal } from '@angular/core';

import { MomentService, Post, UrlUtilsService } from '@dcs-libs/shared';
import { ResourceService } from '../../../core/services';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss'],
  standalone: false
})
export class PostItemComponent {
  private resource = inject(ResourceService);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);

  post = input<Post | null>(null);
  postValue = linkedSignal<Post | null, Post | null>({
    source: this.post,
    computation: (source) => source
  });

  getPostBanner(post: Post | null) {
    if (post?.banner?.url) {
      return this.resource.addApiUrl(post.banner.url);
    }
    return '';
  }

  public stopPropagation(event: any) {
    event.stopPropagation();
  }

  onBannerImgError() {
    this.postValue.set({
      ...(this.postValue() || {}),
      banner: undefined
    } as Post);
  }

  onAuthorImgError(): void {
    if (this.postValue()?.author?.avatarUrl) {
      this.postValue.update(
        (post) =>
          ({
            ...post,
            author: { ...post?.author, avatarUrl: undefined }
          }) as Post
      );
    }
  }
}
