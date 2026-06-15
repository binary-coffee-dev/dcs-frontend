import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal,
  computed,
  linkedSignal,
  effect,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  ENVIRONMENT,
  Environment,
  FetchCommentsAction,
  Post,
  PostState,
  AuthState,
  Permissions,
  WINDOW,
  UrlUtilsService,
  MomentService,
  CreateLikeArticle,
  RemoveLikeArticle,
} from '@dcs-libs/shared';
import {
  MetaTag,
  MetaTagsService,
  ResourceService,
  ScrollService,
} from '../../core/services';
import { LoginRequestModalComponent } from '../components/login-request-modal';

const MAX_NUMBER_OF_POSTS = 6;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: false,
})
export class PostComponent extends Permissions implements OnInit {
  private store = inject(Store);
  private metaTags = inject(MetaTagsService);
  private title = inject(Title);
  private scroll = inject(ScrollService);
  private window = inject<Window>(WINDOW);
  private environment = inject<Environment>(ENVIRONMENT);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  resource = inject(ResourceService);
  moment = inject(MomentService);
  url = inject(UrlUtilsService);

  post = toSignal(this.store.select(PostState.post), { initialValue: null });
  isBrowser = signal<boolean>(false);
  likes = toSignal(this.store.select(PostState.likes));
  userLike = toSignal(this.store.select(PostState.userLike));
  user = toSignal(this.store.select(AuthState.me));

  similarPostsEvent = toSignal(this.store.select(PostState.similarPosts), {
    initialValue: [],
  });
  similarPosts = linkedSignal<Post[], Post[]>({
    source: this.similarPostsEvent,
    computation: (posts) => {
      if (posts) {
        return posts
          .slice(0, Math.min(MAX_NUMBER_OF_POSTS, posts.length))
          .map((post, id) => ({ ...post, id: id + '' } as Post));
      }
      return [];
    },
  });

  articleBody = computed(() => {
    return `${this.environment.apiUrl}post-body-by-name/${
      this.post?.name ?? ''
    }/download.md`;
  });

  isMyPost = computed(() => {
    return (
      this.user()?.id &&
      this.post()?.author?.id &&
      this.post()?.author?.id === this.user()?.id
    );
  });

  constructor() {
    super();
    this.isBrowser.set(isPlatformBrowser(inject(PLATFORM_ID)));

    effect(() => {
      const postId = this.post()?.id;
      const postName = this.post()?.name;
      if (this.post() && postId && postName) {
        const imageUrl = this.post()?.banner
          ? new URL(
              this.post()?.banner?.url ?? '',
              this.environment.apiUrl
            ).toString()
          : '';
        this.metaTags.updateMetas([
          {
            key: MetaTagsService.metas,
            value: new URL(
              `post/${postName}`,
              this.environment.siteUrl
            ).toString(),
          } as MetaTag,
          {
            key: MetaTagsService.titleMeta,
            value: `${this.post()?.title} | 🥇`,
          } as MetaTag,
          { key: MetaTagsService.imageMeta, value: imageUrl } as MetaTag,
          { key: MetaTagsService.twitterImageMeta, value: imageUrl } as MetaTag,
          { key: MetaTagsService.typeMeta, value: 'article' } as MetaTag,
          {
            key: MetaTagsService.twitterTitleMeta,
            value: this.post()?.title,
          } as MetaTag,
        ]);
        this.title.setTitle(`🥇 | ${this.post()?.title}`);
        this.metaTags.addLinkTag(
          {
            rel: 'alternate',
            type: 'application/rss+xml',
            title: `RSS Feed for ${
              this.post()?.author?.username
            } in binary-coffee.dev`,
            href: `${this.environment.apiUrl}posts/feed/${
              this.post()?.author?.username
            }/rss2`,
          },
          'rss-id'
        );

        this.store.dispatch(new FetchCommentsAction(postId));
      }
    });
  }

  ngOnInit(): void {
    const fragment = this.route.snapshot.fragment;
    if (!fragment) {
      this.scroll.smoothScroll();
    }
  }

  editPost() {
    this.window.location.href = `${
      this.environment.siteDashboardUrl
    }/articles/update/${this.post()?.id}`;
  }

  postLikeClick(): void {
    const userId = this.user()?.id;
    const postId = this.post()?.id;
    if (!userId) {
      this.dialog.open(LoginRequestModalComponent, {});
    }
    if (this.userLike() === 0 && userId && postId) {
      this.store.dispatch(new CreateLikeArticle(userId, postId));
    } else if (userId) {
      this.store.dispatch(new RemoveLikeArticle(userId));
    }
  }
}
