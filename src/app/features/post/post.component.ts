import {Component, OnInit} from '@angular/core';

import {Store} from '@ngxs/store';

import {CommentState, PostState} from '../../core/redux/states';
import {Post} from '../../core/redux/models';
import {MetaTag, MetaTagsService, MomentService, ResourceService} from '../../core/services';
import {environment} from '../../../environments/environment';
import {FetchCommentsAction} from '../../core/redux/actions';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: Post;
  commentsCount = 0;

  constructor(
    private store: Store,
    public moment: MomentService,
    public resource: ResourceService,
    private metaTags: MetaTagsService,
    private title: Title
  ) {
  }

  ngOnInit() {
    this.store.select(PostState.post).subscribe((post: Post) => {
      if (post) {
        this.post = post;
        const imageUrl = post.banner ? `${environment.apiUrl}${post.banner.url}` : '';
        this.metaTags.updateMetas([
          {key: MetaTagsService.metas, value: environment.siteUrl} as MetaTag,
          {key: MetaTagsService.titleMeta, value: post.title} as MetaTag,
          {key: MetaTagsService.imageMeta, value: imageUrl} as MetaTag,
          {key: MetaTagsService.descriptionMeta, value: post.description} as MetaTag,
          {key: MetaTagsService.twitterImageMeta, value: imageUrl} as MetaTag,
          {key: MetaTagsService.typeMeta, value: 'article'} as MetaTag,
          {key: MetaTagsService.twitterTitleMeta, value: post.title} as MetaTag
        ]);
        this.title.setTitle(post.title);

        this.store.dispatch(new FetchCommentsAction(post.id));
      }
    });
    this.store.select(CommentState.commentsCount).subscribe(commentsCount => this.commentsCount = commentsCount);
  }

}
