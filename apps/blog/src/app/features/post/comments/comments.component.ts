import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

import { Subject, timer } from 'rxjs';
import { Store } from '@ngxs/store';

import {
  AuthState,
  Comment,
  CommentErrorAction,
  CommentState,
  CreateCommentAction,
  FetchCommentsAction,
  Post,
  UrlUtilsService,
  RoleEnum, User
} from '@dcs-libs/shared';
import { MomentService, ScrollService } from '../../../core/services';
import { LoginRequestModalComponent } from '../../components/login-request-modal';
import { ConfirmDeleteModalComponent } from './confirm-delete.modal/confirm-delete.modal.component';
import { EditCommentModalComponent } from './edit-comment.modal/edit-comment.modal.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss', '../post.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  unsubscribe = new Subject();

  @Input()
  post: Post = {} as Post;

  comments: Comment[] = [];
  commentError = '';

  isLogin = false;

  currentUser: User | undefined = {} as unknown as User;

  commentForm = new UntypedFormGroup({
    body: new UntypedFormControl('', Validators.required)
  });

  constructor(
    private store: Store,
    public moment: MomentService,
    private url: UrlUtilsService,
    private scroll: ScrollService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.store.select(CommentState.comments).subscribe(comments => {
      if (comments) {
        this.comments = comments;
      }
      timer(100).subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scroll.scrollToFragment(fragment);
        }
      });
    });
    this.store.select(CommentState.error).subscribe(error => {
      this.commentError = error.message;
    });
    this.store.select(AuthState.isLogin).subscribe(isLogin => this.isLogin = isLogin);
    this.store.select(AuthState.me).subscribe(user => this.currentUser = user);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next(true);
  }

  commentChangeEvent(): void {
    if (!this.isLogin) {
      this.postLikeClick();
      this.commentForm.controls['body'].setValue('');
    }
  }

  postLikeClick(): void {
    this.dialog.open(LoginRequestModalComponent, {});
  }

  removeComment(commentId: string): void {
    this.dialog.open(ConfirmDeleteModalComponent, {data: {commentId}});
  }

  editComment(comment: Comment): void {
    this.dialog.open(EditCommentModalComponent, {
      width: '500px',
      height: '540px',
      maxHeight: '600px',
      data: {comment}
    });
  }

  createComment(): void {
    if (this.commentForm.valid && this.checkEmptySpaces(this.commentForm.controls['body'].value)) {
      const comment = {
        body: this.commentForm.controls['body'].value,
        post: this.post.id
      } as Comment;
      this.store.dispatch(new CreateCommentAction(comment)).subscribe(() => {
        this.commentForm.reset();
        this.store.dispatch(new FetchCommentsAction(this.post.id));
        this.commentError = '';
      });
    } else {
      this.store.dispatch(new CommentErrorAction('Missing data in the comment'));
    }
  }

  canComment(comment: Comment): boolean {
    if (comment && comment.user && comment.user.id === this.currentUser?.id) {
      return true;
    }
    return Boolean(comment && comment.user && (this.isAdmin(this.currentUser) || this.isStaff(this.currentUser)));
  }

  canCurrentUserEditComment(comment: Comment): boolean {
    return (comment.user && this.currentUser && comment.user.username === this.currentUser.username) ||
      this.isStaff(this.currentUser) ||
      this.isAdmin(this.currentUser);
  }

  isCommentFromPostOwner(comment: Comment): boolean {
    return Boolean(this.post && this.post.author && this.post.author.username === this.getName(comment));
  }

  isStaffOrAdmin(comment: Comment): boolean {
    return this.isStaff(comment.user) || this.isAdmin(comment.user);
  }

  isStaff(user: User | undefined): boolean {
    return Boolean(user && user.role && user.role.type === RoleEnum.staff);
  }

  isAdmin(user: User | undefined): boolean {
    return Boolean(user && user.role && user.role.type === RoleEnum.administrator);
  }

  getRoleName(comment: Comment): string {
    return comment.user ? comment.user.role.name : '';
  }

  getUserAvatar(user: User | undefined): string {
    return this.url.getUserImage(user);
  }

  getName(comment: Comment): string {
    return comment.name || (comment.user && comment.user.username) || 'public';
  }

  checkEmptySpaces(value: string): boolean {
    return value.replace(/ /gi, '') !== '';
  }
}
