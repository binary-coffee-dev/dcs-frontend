import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngxs/store';
import { BehaviorSubject, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import {
  AuthState, Environment, ENVIRONMENT, FetchTagsAction,
  File, Permissions,
  Post,
  PostCreateAction,
  PostState,
  PostUpdateAction, Tag, TagState,
  UrlUtilsService, WINDOW
} from '@dcs-libs/shared';
import { SelectImageModalComponent } from './select-image-modal/select-image-modal.component';
import { UploadFileModalComponent } from '../../components/upload-file.modal';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends Permissions implements OnInit, OnDestroy {
  post = {
    body: ''
  } as Post;

  formDataChange = false;
  imageChange = false;

  timesSelections = [];

  articleForm = new FormGroup({
    body: new FormControl(''),
    enable: new FormControl(''),
    title: new FormControl(''),
    tags: new FormControl([]),
    date: new FormControl(),
    time: new FormControl()
  });

  tags = new BehaviorSubject([]);

  _unsubscribe = new Subject();
  _stopTimer = new Subject();

  articleTextStatus: 'edit' | 'preview' = 'edit';

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private url: UrlUtilsService,
    @Inject(ENVIRONMENT) private env: Environment,
    @Inject(WINDOW) private window: Window
  ) {
    super();
    this.timesSelections = [...Array(24).keys()].reduce((p, v) => {
      p.push({ minutes: v * 60, title: `${v}:00` });
      p.push({ minutes: v * 60 + 30, title: `${v}:30` });
      return p;
    }, []);

    this.window.document.addEventListener('keydown', this.shortCutHandlerMethod.bind(this));
  }

  ngOnInit() {
    if (!this.isNewPost()) {
      this.store.select(PostState.post).pipe(takeUntil(this._unsubscribe)).subscribe(post => {
        if (post) {
          const newPost = { ...post };
          if (newPost.banner) {
            newPost.banner = { ...newPost.banner };
            newPost.banner.url = this.url.normalizeImageUrl(newPost.banner.url);
          }
          this.post = newPost;
          this.articleForm.controls.body.setValue(this.post.body);
          this.articleForm.controls.title.setValue(this.post.title);
          this.articleForm.controls.enable.setValue(Boolean(this.post.enable));
          this.articleForm.controls.tags.setValue(this.post.tags.map(tag => ({ display: tag.name, value: tag.id })));

          if (this.post.publishedAt) {
            this.post.publishedAt = new Date(this.post.publishedAt);
            this.articleForm.controls.date.setValue(this.post.publishedAt);

            const time = this.post.publishedAt.getHours() * 60 + this.post.publishedAt.getMinutes();
            this.articleForm.controls.time.setValue(time);
          }
        }
      });
    }
    this.store.dispatch(new FetchTagsAction());
    this.store.select(TagState.tags)
      .pipe(
        takeUntil(this._unsubscribe),
        map(tags => tags.map(tag => ({ display: tag.name, value: tag.id })))
      )
      .subscribe(values => this.tags.next(values));
    this.getTags = this.getTags.bind(this);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._stopTimer.next();
    this.window.document.removeEventListener('keydown', this.shortCutHandlerMethod.bind(this));
  }

  shortCutHandlerMethod(event) {
    if (event.ctrlKey && (event.which === 83)) {
      event.preventDefault();
      this.submitPost();
      return false;
    }
  }

  getTags() {
    return this.tags;
  }

  normalizeUrl(url) {
    return this.url.normalizeImageUrl(url);
  }

  isNewPost() {
    return !this.activatedRoute.snapshot.params.id;
  }

  textChange() {
    const TIME_TO_WAIT_UNTIL_REFRESH = 500;
    this._stopTimer.next();
    timer(TIME_TO_WAIT_UNTIL_REFRESH)
      .pipe(takeUntil(this._stopTimer))
      .subscribe(() => this.onPostChange());
  }

  onPostChange() {
    const keyNames = ['body', 'title', 'enable'];
    this.formDataChange = keyNames.reduce((prev, key) => {
      return (
        prev ||
        (this.post && this.post[key] !== this.articleForm.controls[key].value)
      );
    }, false);

    const date = this.post.publishedAt ? this.getDatesParameters(new Date(this.post.publishedAt)) : {};
    const date2 = this.articleForm.controls.date.value ? this.getDatesParameters(new Date(this.articleForm.controls.date.value)) : {};
    const { hours, minutes } = this.getHMFromMinutes(this.articleForm.controls.time.value);
    const publishedAtChange = date.minutes !== minutes ||
      date.hours !== hours ||
      date.day !== date2.day ||
      date.month !== date2.month ||
      date.year !== date2.year;

    this.formDataChange = this.formDataChange || publishedAtChange || this.tagChange();
  }

  tagChange() {
    const tset = new Set();
    if (this.post.tags.length !== this.articleForm.controls.tags.value.length) {
      return true;
    }
    this.post.tags.forEach(tag => tset.add(tag.id));
    return this.articleForm.controls.tags.value.reduce((p, v) => p || !tset.has(v.value), false);
  }

  submitPost() {
    if (this.formDataChange) {
      this.post.body = this.articleForm.controls.body.value;
      this.post.title = this.articleForm.controls.title.value;
      this.post.enable = !!this.articleForm.controls.enable.value;
      this.post.tags = this.articleForm.controls.tags.value.map(tag => ({ name: tag.display, id: tag.value } as Tag));

      let date;
      if (this.articleForm.controls.date.value && (this.articleForm.controls.time.value || this.articleForm.controls.time.value === 0)) {
        date = new Date(this.articleForm.controls.date.value);
        const { hours, minutes } = this.getHMFromMinutes(this.articleForm.controls.time.value);
        date.setHours(hours);
        date.setMinutes(minutes);
      }
      this.post.publishedAt = date;

      if (this.isNewPost()) {
        this.store
          .dispatch(
            new PostCreateAction(
              this.post,
              this.store.selectSnapshot(AuthState.me)
            )
          )
          .subscribe(() => {
            this.formDataChange = false;
            this.imageChange = false;
            this.router.navigate([
              `/articles/update/${this.store.selectSnapshot(PostState.newPostId)}`
            ]);
          });
      } else {
        this.store.dispatch(new PostUpdateAction(this.post))
          .pipe(takeUntil(this._unsubscribe))
          .subscribe(() => {
            this.imageChange = this.formDataChange = false;
          });
      }
    }
  }

  getHMFromMinutes(time) {
    if (!time) {
      return { hours: null, minutes: null };
    }
    const hours = Math.floor(time / 60);
    const minutes = time - (hours * 60);
    return { hours, minutes };
  }

  getDatesParameters(date: Date): { day?: number, month?: number, year?: number, hours?: number, minutes?: number } {
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
      width: '50vw'
    });

    dialog.afterClosed()
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((image: File) => {
        if (image) {
          this.post.banner = image;
          this.imageChange = true;
        }
      });
  }

  openUploadFileModal() {
    const dialog = this.dialog.open(UploadFileModalComponent, {
      height: 'auto',
      width: '50vh',
    });
    dialog.afterClosed().subscribe((image: File) => {
      if (image) {
        this.post.banner = image;
        this.imageChange = true;
      }
    });
  }

  removeCurrentBanner() {
    this.post.banner = null;
    this.imageChange = true;
  }

  getPostPreviewUrl() {
    return `${this.env.siteUrl}/post/${this.post.name}`;
  }

  changeArticleStatus() {
    this.articleTextStatus = this.articleTextStatus === 'edit' ? 'preview' : 'edit';
  }
}
