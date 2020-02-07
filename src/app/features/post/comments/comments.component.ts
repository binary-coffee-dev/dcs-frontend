import {Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Subject, timer} from 'rxjs';
import {Store} from '@ngxs/store';

import {CommentErrorAction, CreateCommentAction, FetchCaptchaAction, FetchCommentsAction} from '../../../core/redux/actions';
import {CommentState} from '../../../core/redux/states';
import {Captcha, Comment, Post} from '../../../core/redux/models';
import {MomentService} from '../../../core/services';
import {takeUntil} from 'rxjs/operators';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  _unsubscribe = new Subject();

  @Input()
  post: Post = {} as Post;

  captcha: Captcha;
  myCaptcha: SafeHtml;

  comments: Comment[] = [];
  commentError = '';

  commentForm = new FormGroup({
    body: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    captcha: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required)
  });

  constructor(
    private store: Store,
    private sanitizer: DomSanitizer,
    public moment: MomentService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchCaptchaAction());
    this.store.select(CommentState.captcha).subscribe(captcha => {
      this.captcha = captcha;
      if (captcha) {
        this.myCaptcha = this.sanitizer.bypassSecurityTrustHtml(captcha.captcha);
        this._unsubscribe.next();
        if (isPlatformBrowser(this.platformId)) {
          timer(120000).pipe(takeUntil(this._unsubscribe)).subscribe(() => this.reloadCaptcha());
        }
      }
    });
    this.store.select(CommentState.comments).subscribe(comments => {
      if (comments) {
        this.comments = comments;
      }
    });
    this.store.select(CommentState.error).subscribe(error => {
      this.commentError = error.message;
      this.reloadCaptcha();
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  reloadCaptcha() {
    this.store.dispatch(new FetchCaptchaAction()).subscribe(() => {});
    this.commentForm.controls.captcha.setValue('');
  }

  createComment() {
    if (this.commentForm.valid
      && this.checkEmptySpaces(this.commentForm.controls.body.value)
      && this.checkEmptySpaces(this.commentForm.controls.email.value)
      && this.checkEmptySpaces(this.commentForm.controls.name.value)
      && this.checkEmptySpaces(this.commentForm.controls.captcha.value)) {
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
        this.store.dispatch(new FetchCommentsAction(this.post.id));
        this.commentError = '';
      });
    } else {
      this.store.dispatch(new CommentErrorAction('Missing data in the comment'));
    }
  }

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
