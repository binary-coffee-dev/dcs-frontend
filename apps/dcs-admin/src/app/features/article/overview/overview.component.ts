import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {Store} from '@ngxs/store';

import {
  AuthState,
  File,
  Post,
  PostCreateAction,
  PostState,
  PostUpdateAction,
  UrlUtilsService
} from '@dcs-libs/shared';
import {SelectImageModalComponent} from './select-image-modal/select-image-modal.component';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  post = {
    body: ''
  } as Post;

  formDataChange = false;
  imageChange = false;

  articleForm = new FormGroup({
    body: new FormControl(''),
    enable: new FormControl(''),
    description: new FormControl(''),
    title: new FormControl('')
  });

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private url: UrlUtilsService
  ) {
  }

  ngOnInit() {
    if (!this.isNewPost()) {
      this.store.select(PostState.post).subscribe(post => {
        if (post) {
          const newPost = {...post};
          if (newPost.banner) {
            newPost.banner = {...newPost.banner};
            newPost.banner.url = this.url.normalizeImageUrl(newPost.banner.url);
          }
          this.post = newPost;
          this.articleForm.controls.body.setValue(this.post.body);
          this.articleForm.controls.description.setValue(this.post.description);
          this.articleForm.controls.title.setValue(this.post.title);
          this.articleForm.controls.enable.setValue(Boolean(this.post.enable));
        }
      });
    }
  }

  normalizeUrl(url) {
    return this.url.normalizeImageUrl(url);
  }

  isNewPost() {
    return !this.activatedRoute.snapshot.params.id;
  }

  onPostChange() {
    const keyNames = ['body', 'description', 'title', 'enable'];
    this.formDataChange = keyNames.reduce((prev, key) => {
      return (
        prev ||
        (this.post && this.post[key] !== this.articleForm.controls[key].value)
      );
    }, false);
  }

  submitPost() {
    this.post.body = this.articleForm.controls.body.value;
    this.post.description = this.articleForm.controls.description.value;
    this.post.title = this.articleForm.controls.title.value;
    this.post.enable = !!this.articleForm.controls.enable.value;

    if (this.isNewPost()) {
      this.store
        .dispatch(
          new PostCreateAction(
            this.post,
            this.store.selectSnapshot(AuthState.me)
          )
        )
        .subscribe(() => {
          this.router.navigate([
            `/articles/update/${this.store.selectSnapshot(PostState.newPostId)}`
          ]);
        });
    } else {
      this.store.dispatch(new PostUpdateAction(this.post)).subscribe(() => {
        this.imageChange = this.formDataChange = false;
      });
    }
  }

  openImageSectorModal() {
    const dialog = this.dialog.open(SelectImageModalComponent, {
      height: 'auto',
      width: '50vw'
    });

    dialog.afterClosed().subscribe((image: File) => {
      if (image) {
        this.post.banner = image;
        this.imageChange = true;
      }
    });
  }
}
