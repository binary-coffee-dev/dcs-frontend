import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngxs/store';
import { isPlatformBrowser } from '@angular/common';

import {
  ENVIRONMENT,
  Environment,
  FetchCommentsAction,
  Post,
  PostState,
  AuthState,
  Permissions,
  WINDOW
} from '@dcs-libs/shared';
import { MetaTag, MetaTagsService, ResourceService, ScrollService } from '../../core/services';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends Permissions implements OnInit {

  post: Post;
  isBrowser: boolean;

  constructor(
    private store: Store,
    public resource: ResourceService,
    private metaTags: MetaTagsService,
    private title: Title,
    private scroll: ScrollService,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private environment: Environment,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadArticle(this.route.snapshot.data.post);
    this.store.select(PostState.post).subscribe((post: Post) => this.loadArticle(post));
    const fragment = this.route.snapshot.fragment;
    if (!fragment) {
      this.scroll.smoothScroll();
    }
  }

  loadArticle(post: Post) {
    if (post) {
      this.post = post;
      const imageUrl = post.banner ? new URL(post.banner.url, this.environment.apiUrl).toString() : '';
      this.metaTags.updateMetas([
        {key: MetaTagsService.metas, value: new URL(`post/${post.name}`, this.environment.siteUrl).toString()} as MetaTag,
        {key: MetaTagsService.titleMeta, value: `${post.title} | 🥇`} as MetaTag,
        {key: MetaTagsService.imageMeta, value: imageUrl} as MetaTag,
        {key: MetaTagsService.descriptionMeta, value: `✅ ${post.description}`} as MetaTag,
        {key: MetaTagsService.twitterImageMeta, value: imageUrl} as MetaTag,
        {key: MetaTagsService.typeMeta, value: 'article'} as MetaTag,
        {key: MetaTagsService.twitterTitleMeta, value: post.title} as MetaTag
      ]);
      this.title.setTitle(`🥇 | ${post.title}`);

      this.store.dispatch(new FetchCommentsAction(post.id));
    }
  }

  isMyPost(post) {
    const user = this.store.selectSnapshot(AuthState.me);
    return !!user && !!post.author && post.author.id === user.id;
  }

  editPost(post) {
    this.window.location.href = `${this.environment.siteDashboardUrl}/articles/update/${post.id}`;
  }
}
