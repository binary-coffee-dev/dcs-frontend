import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { Store } from '@ngxs/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import {
  ENVIRONMENT,
  Environment,
  FetchCommentsAction,
  Post,
  PostState,
  AuthState,
  Permissions,
  WINDOW, UrlUtilsService, MomentService, CreateLikeArticle, RemoveLikeArticle
} from '@dcs-libs/shared';
import { MetaTag, MetaTagsService, ResourceService, ScrollService } from '../../core/services';
import { LoginRequestModalComponent } from '../components/login-request-modal';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import {KatexOptions} from "ngx-markdown";

const MAX_NUMBER_OF_POSTS = 6;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends Permissions implements OnInit, OnDestroy {

  post: Post = {} as unknown as Post;
  similarPosts: Post[] = [];
  isBrowser: boolean;
  likes = 0;
  userLike = 0;
  katexOptions: KatexOptions = {
    delimiters: [{left: "$$", right: "$$", display: true}]
  };

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
    protected sanitizer: DomSanitizer,
    private dialog: MatDialog,
  ) {
    super();
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.loadArticle(this.route.snapshot.data['post']);
    this.store.select(PostState.post).subscribe((post: Post) => this.loadArticle(post));
    const fragment = this.route.snapshot.fragment;
    if (!fragment) {
      this.scroll.smoothScroll();
    }
    this.store.select(PostState.likes)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(likes => this.likes = likes);
    this.store.select(PostState.userLike)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(userLike => this.userLike = userLike);
    this.store.select(PostState.similarPosts).subscribe((posts: Post[]) => {
      this.loadPosts(posts);
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(true);
  }

  loadPosts(posts: Post[]) {
    if (posts) {
      this.similarPosts = [...posts].reduce((previousValue: Post[], currentValue, currentIndex) => {
        if (currentIndex < MAX_NUMBER_OF_POSTS) {
          previousValue.push(currentValue);
        }
        return previousValue;
      }, []);
    }
  }

  loadArticle(post: Post) {
    if (post) {
      this.post = post;
      const imageUrl = post.banner ? new URL(post?.banner?.url || '', this.environment.apiUrl).toString() : '';
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
        title: `RSS Feed for ${post.author?.username} in binary-coffee.dev`,
        href: `${this.environment.apiUrl}posts/feed/${this.post.author?.username}/rss2`
      }, 'rss-id');

      this.store.dispatch(new FetchCommentsAction(post.id));
    }
  }

  articleBody(): string {
    return `${this.environment.apiUrl}post-body-by-name/${(this.post?.name || '')}/download.md`;
  }

  isMyPost(post: Post) {
    const user = this.store.selectSnapshot(AuthState.me);
    return !!user && !!post.author && post.author.id === user.id;
  }

  editPost(post: Post) {
    this.window.location.href = `${this.environment.siteDashboardUrl}/articles/update/${post.id}`;
  }

  postLikeClick() {
    const user = this.store.selectSnapshot(AuthState.me);
    if (!user || !user.id) {
      this.dialog.open(LoginRequestModalComponent, {});
    }
    if (this.userLike === 0 && user && user.id) {
      this.store.dispatch(new CreateLikeArticle(user.id, this.post.id));
    } else if (user && user.id) {
      this.store.dispatch(new RemoveLikeArticle(this.post.id));
    }
  }
}
