import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
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
  WINDOW, UrlUtilsService, MomentService
} from '@dcs-libs/shared';
import { MetaTag, MetaTagsService, ResourceService, ScrollService } from '../../core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends Permissions implements OnInit, OnDestroy {

  post: Post;
  isBrowser: boolean;
  likes = 0;

  _unsubscribe = new Subject();

  constructor(
    private store: Store,
    public resource: ResourceService,
    private metaTags: MetaTagsService,
    public moment: MomentService,
    private title: Title,
    private scroll: ScrollService,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private environment: Environment,
    private route: ActivatedRoute,
    public url: UrlUtilsService,
    @Inject(PLATFORM_ID) platformId: string,
    protected sanitizer: DomSanitizer
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
    this.store.select(PostState.likes)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(likes => this.likes = likes);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  loadArticle(post: Post) {
    if (post) {
      this.post = post;
      const imageUrl = post.banner ? new URL(post.banner.url, this.environment.apiUrl).toString() : '';
      this.metaTags.updateMetas([
        {
          key: MetaTagsService.metas,
          value: new URL(`post/${post.name}`, this.environment.siteUrl).toString()
        } as MetaTag,
        { key: MetaTagsService.titleMeta, value: `${post.title} | 🥇` } as MetaTag,
        { key: MetaTagsService.imageMeta, value: imageUrl } as MetaTag,
        { key: MetaTagsService.twitterImageMeta, value: imageUrl } as MetaTag,
        { key: MetaTagsService.typeMeta, value: 'article' } as MetaTag,
        { key: MetaTagsService.twitterTitleMeta, value: post.title } as MetaTag
      ]);
      this.title.setTitle(`🥇 | ${post.title}`);
      this.metaTags.addLinkTag({
        rel: 'alternate',
        type: 'application/rss+xml',
        title: `RSS Feed for ${post.author.username} in binary-coffee.dev`,
        href: `${this.environment.apiUrl}posts/feed/${this.post.author.username}/rss2`
      }, 'rss-id');

      this.store.dispatch(new FetchCommentsAction(post.id));
    }
  }

  articleBody(): string {
    return `${this.environment.apiUrl}post-body-by-name/${(this.post?.name || '')}/download.md`;
  }

  isMyPost(post) {
    const user = this.store.selectSnapshot(AuthState.me);
    return !!user && !!post.author && post.author.id === user.id;
  }

  editPost(post) {
    this.window.location.href = `${this.environment.siteDashboardUrl}/articles/update/${post.id}`;
  }
}
