import {
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
  effect,
  linkedSignal,
  computed,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngxs/store';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AuthState,
  Environment,
  ENVIRONMENT,
  FetchTagsAction,
  File,
  Permissions,
  PostCreateAction,
  PostState,
  PostUpdateAction,
  Tag,
  TagState,
  UrlUtilsService,
  WINDOW,
} from '@dcs-libs/shared';
import { SelectImageModalComponent } from './select-image-modal/select-image-modal.component';
import { UploadFileModalComponent } from '../../components/upload-file.modal';

interface TimeType {
  title: string;
  minutes: number;
}

interface AutoCompleteModel {
  value: string;
  display: string;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  standalone: false,
})
export class OverviewComponent
  extends Permissions
  implements OnInit, OnDestroy
{
  private store = inject(Store);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private url = inject(UrlUtilsService);
  private env = inject<Environment>(ENVIRONMENT);
  private window = inject<Window>(WINDOW);

  postStore = toSignal(this.store.select(PostState.post), {
    initialValue: null,
  });
  post = linkedSignal({
    source: this.postStore,
    computation: (post) => {
      if (post) {
        const newPost = { ...post };
        if (newPost.banner?.url) {
          newPost.banner = { ...newPost.banner };
          newPost.banner.url = this.url.normalizeImageUrl(newPost.banner.url);
        }
        return newPost;
      }
      return post;
    },
  });
  getPostPreviewUrl = computed(() => {
    const post = this.post();
    if (post) {
      return `${this.env.siteUrl}/post/${post.name}`;
    }
    return '';
  });

  formDataChange = signal<boolean>(false);
  imageChange = signal<boolean>(false);

  timesSelections = signal<TimeType[]>([]);
  articleTextStatus = signal<'edit' | 'preview'>('edit');

  articleForm = new UntypedFormGroup({
    body: new UntypedFormControl(''),
    enable: new UntypedFormControl(''),
    title: new UntypedFormControl(''),
    tags: new UntypedFormControl([]),
    date: new UntypedFormControl(),
    time: new UntypedFormControl(),
  });

  tagsStore = toSignal(this.store.select(TagState.tags), { initialValue: [] });
  tags = computed(() =>
    this.tagsStore().map((tag) => ({ display: tag.name, value: tag.id }))
  );

  routeParams = toSignal(this.activatedRoute.params);
  isNewPost = computed(() => !this.routeParams()?.['id']);
  isPublished = computed(() => Boolean(this.post()?.publishedAt));

  _stopTimer = new Subject();

  constructor() {
    super();
    this.populateAvailableTimes();

    this.window.document.addEventListener(
      'keydown',
      this.shortCutHandlerMethod.bind(this)
    );
  }

  ngOnInit() {
    if (!this.isNewPost()) {
      effect(() => {
        const post = this.post();
        if (post) {
          this.articleForm.controls['body'].setValue(post.body);
          this.articleForm.controls['title'].setValue(post.title);
          this.articleForm.controls['enable'].setValue(Boolean(post.enable));
          this.articleForm.controls['tags'].setValue(
            post.tags.map(
              (tag: Tag) =>
                ({
                  display: tag.name,
                  value: tag.id,
                } as AutoCompleteModel)
            )
          );

          if (post.publishedAt) {
            post.publishedAt = new Date(post.publishedAt);
            this.articleForm.controls['date'].setValue(post.publishedAt);

            const minutes =
              post.publishedAt.getHours() * 60 + post.publishedAt.getMinutes();
            const title = `${post.publishedAt.getHours()}:${post.publishedAt.getMinutes()}`;
            this.populateAvailableTimes({ title, minutes } as TimeType);

            this.articleForm.controls['time'].setValue(minutes);
          }
        }
      });
    }
    this.store.dispatch(new FetchTagsAction());
  }

  ngOnDestroy(): void {
    if (this.window?.document?.removeEventListener) {
      this.window.document.removeEventListener(
        'keydown',
        this.shortCutHandlerMethod.bind(this)
      );
    }
  }

  populateAvailableTimes(extraTime: TimeType | null = null): void {
    this.timesSelections.set(
      [...Array(24).keys()].reduce((p: TimeType[], v: number) => {
        p.push({ minutes: v * 60, title: `${v}:00` } as TimeType);
        p.push({ minutes: v * 60 + 30, title: `${v}:30` } as TimeType);
        return p;
      }, [])
    );

    if (extraTime) {
      this.timesSelections.update((times) => [...times, extraTime]);
    }

    this.timesSelections.update((times) =>
      times.sort((a: TimeType, b: TimeType): number => a.minutes - b.minutes)
    );
  }

  shortCutHandlerMethod(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'KeyS') {
      event.preventDefault();
      this.submitPost();
      return false;
    }
    return true;
  }

  normalizeUrl(url: string | undefined | null) {
    return this.url.normalizeImageUrl(url);
  }

  textChange() {
    const TIME_TO_WAIT_UNTIL_REFRESH = 500;
    this._stopTimer.next(true);
    timer(TIME_TO_WAIT_UNTIL_REFRESH)
      .pipe(takeUntil(this._stopTimer), takeUntilDestroyed())
      .subscribe(() => this.onPostChange());
  }

  onPostChange() {
    const post = this.post();
    if (post) {
      const keyNames = ['body', 'title', 'enable'];
      this.formDataChange.set(
        keyNames.reduce<boolean>((prev, key: string) => {
          return Boolean(
            prev || (post as any)[key] !== this.articleForm.controls[key].value
          );
        }, false)
      );

      const date = post.publishedAt
        ? this.getDatesParameters(new Date(post.publishedAt))
        : {};

      const date2 = this.articleForm.controls['date'].value
        ? this.getDatesParameters(
            new Date(this.articleForm.controls['date'].value)
          )
        : {};
      const { hours, minutes } = this.getHMFromMinutes(
        this.articleForm.controls['time'].value
      );
      const publishedAtChange =
        date.minutes !== minutes ||
        date.hours !== hours ||
        date.day !== date2.day ||
        date.month !== date2.month ||
        date.year !== date2.year;

      this.formDataChange.update(
        (formDataChange) =>
          formDataChange || publishedAtChange || this.tagChange()
      );
    }
  }

  tagChange() {
    const post = this.post();
    const tset = new Set<string>();
    if (post) {
      if (post.tags.length !== this.articleForm.controls['tags'].value.length) {
        return true;
      }
      post.tags.forEach((tag: Tag) => tset.add(tag.id));
      return this.articleForm.controls['tags'].value.reduce(
        (prev: boolean, value: AutoCompleteModel) =>
          prev || !tset.has(value.value),
        false
      );
    }
  }

  submitPost() {
    if (this.formDataChange()) {
      this.post.update((post) => {
        if (post) {
          return {
            ...post,
            body: this.articleForm.controls['body'].value,
            title: this.articleForm.controls['title'].value,
            enable: this.articleForm.controls['enable'].value,
            tags: this.articleForm.controls['tags'].value.map(
              (tag: AutoCompleteModel) =>
                ({ name: tag.display, id: tag.value } as Tag)
            ),
          };
        }
        return post;
      });

      let date: Date;
      if (
        this.articleForm.controls['date'].value &&
        (this.articleForm.controls['time'].value ||
          this.articleForm.controls['time'].value === 0)
      ) {
        date = new Date(this.articleForm.controls['date'].value);
        const { hours, minutes } = this.getHMFromMinutes(
          this.articleForm.controls['time'].value
        );
        if (hours !== null) {
          date.setHours(hours);
        }
        if (minutes !== null) {
          date.setMinutes(minutes);
        }
      }
      this.post.update((post) =>
        post ? { ...post, publishedAt: date } : post
      );

      const post = this.post();
      if (this.isNewPost() && post) {
        this.store
          .dispatch(
            new PostCreateAction(post, this.store.selectSnapshot(AuthState.me))
          )
          .subscribe(() => {
            this.formDataChange.set(false);
            this.imageChange.set(false);
            this.router.navigate([
              `/articles/update/${this.store.selectSnapshot(
                PostState.newPostId
              )}`,
            ]);
          });
      } else if (post) {
        this.store
          .dispatch(new PostUpdateAction(post))
          .pipe(takeUntilDestroyed())
          .subscribe(() => {
            this.imageChange.set(false);
            this.formDataChange.set(false);
          });
      }
    }
  }

  getHMFromMinutes(time: number) {
    if (!time) {
      return { hours: null, minutes: null };
    }
    const hours = Math.floor(time / 60);
    const minutes = time - hours * 60;
    return { hours, minutes };
  }

  getDatesParameters(date: Date): {
    day?: number;
    month?: number;
    year?: number;
    hours?: number;
    minutes?: number;
  } {
    if (!date) {
      return {};
    }
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return { day, month, year, hours, minutes };
  }

  openImageSectorModal() {
    const dialog = this.dialog.open(SelectImageModalComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '700px',
    });

    dialog
      .afterClosed()
      .pipe(takeUntilDestroyed())
      .subscribe((image: File) => {
        if (image) {
          this.post.update((post) =>
            post ? { ...post, banner: image } : post
          );
          this.imageChange.set(true);
        }
      });
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '100%',
      maxWidth: '425px',
    });
    dialog.afterClosed().subscribe((image: File) => {
      if (image) {
        this.post.update((post) => (post ? { ...post, banner: image } : post));
        this.imageChange.set(true);
      }
    });
  }

  removeCurrentBanner() {
    this.post.update((post) => (post ? { ...post, banner: undefined } : post));
    this.imageChange.set(true);
  }

  changeArticleStatus() {
    this.articleTextStatus.update((status) =>
      status === 'edit' ? 'preview' : 'edit'
    );
  }
}
