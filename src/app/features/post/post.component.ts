import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {PostState} from '../../core/redux/states';
import {Post} from '../../core/redux/models';
import {MetaTag, MetaTagsService, MomentService, ResourceService} from '../../core/services';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;

  constructor(
    private store: Store,
    public moment: MomentService,
    public resource: ResourceService,
    private metaTags: MetaTagsService
  ) {
  }

  ngOnInit() {
    this.store.select(PostState.post).subscribe((post: Post) => {
      this.post = post;
      if (post) {
        this.metaTags.updateMetas([
          {key: MetaTagsService.titleMeta, value: post.title} as MetaTag,
          {key: MetaTagsService.imageMeta, value: `${environment.apiUrl}${post.banner.url}`} as MetaTag,
          {key: MetaTagsService.descriptionMeta, value: post.description} as MetaTag,
          {key: MetaTagsService.twitterImageMeta, value: `${environment.apiUrl}${post.banner.url}`} as MetaTag,
          {key: MetaTagsService.twitterTitleMeta, value: post.title} as MetaTag
        ]);
      }
    });
  }

}
