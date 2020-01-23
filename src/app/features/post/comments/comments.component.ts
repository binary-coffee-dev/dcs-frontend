import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {Store} from '@ngxs/store';

import {CreateCommentAction, FetchCaptchaAction} from '../../../core/redux/actions';
import {CommentState} from '../../../core/redux/states';
import {Captcha, Comment, Post} from '../../../core/redux/models';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input()
  post: Post = {} as Post;

  captcha: Captcha;
  myCaptcha: SafeHtml;

  commentForm = new FormGroup({
    body: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    captcha: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  constructor(private store: Store, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchCaptchaAction());
    this.store.select(CommentState.captcha).subscribe(captcha => {
      this.captcha = captcha;
      if (captcha) {
        this.myCaptcha = this.sanitizer.bypassSecurityTrustHtml(captcha.captcha);
      }
    });
  }

  reloadCaptcha() {
    this.store.dispatch(new FetchCaptchaAction()).subscribe(() => {});
  }

  createComment() {
    if (this.commentForm.valid) {
      const comment = {
        body: this.commentForm.controls.body.value,
        email: this.commentForm.controls.email.value,
        name: this.commentForm.controls.name.value,
        post: this.post.id
      } as Comment;
      const captcha = {
        captcha: this.commentForm.controls.captcha.value,
        token: this.captcha.token
      } as Captcha;
      this.store.dispatch(new CreateCommentAction(comment, captcha)).subscribe(() => {
        this.commentForm.reset();
        this.reloadCaptcha();
      });
    }
  }
}
