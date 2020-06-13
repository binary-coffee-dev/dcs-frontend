import {Component, Inject, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material';

import {Store} from '@ngxs/store';

import {
  ENVIRONMENT,
  Environment,
  FetchCommentsAction,
  Post,
  PostState,
  AuthState,
  Permissions,
  WINDOW, CreateLikeArticle, RemoveLikeArticle
} from '@dcs-libs/shared';
import {MetaTag, MetaTagsService, MomentService, ResourceService, ScrollService} from '../../core/services';
import {LoginRequestModalComponent} from '../components/login-request-modal';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent extends Permissions implements OnInit {

  post: Post;
  likes = 0;
  userLike = 0;

  constructor(
    private store: Store,
    public moment: MomentService,
    public resource: ResourceService,
    private metaTags: MetaTagsService,
    private title: Title,
    private scroll: ScrollService,
    @Inject(WINDOW) private window: Window,
    @Inject(ENVIRONMENT) private environment: Environment,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.store.select(PostState.post).subscribe((post: Post) => {
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
    });
    this.store.select(PostState.likes).subscribe(likes => this.likes = likes);
    this.store.select(PostState.userLike).subscribe(userLike => this.userLike = userLike);
    const fragment = this.route.snapshot.fragment;
    if (!fragment) {
      this.scroll.smoothScroll();
    }
  }

  isMyPost(post) {
    const user = this.store.selectSnapshot(AuthState.me);
    return !!user && !!post.author && post.author.id === user.id;
  }

  editPost(post) {
    this.window.location.href = `${this.environment.siteDashboardUrl}/articles/update/${post.id}`;
  }

  postLikeTitle() {
    if (this.userLike > 0) {
      return 'Dejar sin café al autor';
    }
    return 'Invitarías a un café al autor';
  }

  postLikeClick() {
    const user = this.store.selectSnapshot(AuthState.me);
    if (!user) {
      this.dialog.open(LoginRequestModalComponent, {});
    }
    if (this.userLike === 0 && user) {
      this.store.dispatch(new CreateLikeArticle(user.id, this.post.id));
    } else if (user) {
      this.store.dispatch(new RemoveLikeArticle(this.post.id));
    }
  }
}
