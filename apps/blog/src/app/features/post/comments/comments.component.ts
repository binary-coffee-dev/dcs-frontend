import { Component, inject, input, effect, linkedSignal } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

import { timer } from 'rxjs';
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
  RoleEnum,
  User,
  MomentService
} from '@dcs-libs/shared';
import { ScrollService } from '../../../core/services';
import { LoginRequestModalComponent } from '../../components/login-request-modal';
import { ConfirmDeleteModalComponent } from './confirm-delete.modal/confirm-delete.modal.component';
import { EditCommentModalComponent } from './edit-comment.modal/edit-comment.modal.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss', '../post.component.scss'],
  standalone: false
})
export class CommentsComponent {
  private store = inject(Store);
  moment = inject(MomentService);
  private url = inject(UrlUtilsService);
  private scroll = inject(ScrollService);
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);

  post = input<Post | null>(null);

  comments = toSignal(this.store.select(CommentState.comments));
  error = toSignal(this.store.select(CommentState.error));
  commentError = linkedSignal({
    source: this.error,
    computation: (error) => error?.message
  });

  isLogin = toSignal(this.store.select(AuthState.isLogin));
  currentUser = toSignal(this.store.select(AuthState.me));

  commentForm = new UntypedFormGroup({
    body: new UntypedFormControl('', Validators.required)
  });

  constructor() {
    effect(() => {
      timer(100).subscribe(() => {
        const fragment = this.route.snapshot.fragment;
        if (fragment) {
          this.scroll.scrollToFragment(fragment);
        }
      });
    });
  }

  commentChangeEvent(): void {
    if (!this.isLogin()) {
      this.postLikeClick();
      this.commentForm.controls['body'].setValue('');
    }
  }

  postLikeClick(): void {
    this.dialog.open(LoginRequestModalComponent, {});
  }

  removeComment(commentId: string): void {
    this.dialog.open(ConfirmDeleteModalComponent, { data: { commentId } });
  }

  editComment(comment: Comment): void {
    this.dialog.open(EditCommentModalComponent, {
      width: '500px',
      height: '540px',
      maxHeight: '600px',
      data: { comment }
    });
  }

  createComment(): void {
    const postId = this.post()?.id;
    if (
      this.commentForm.valid &&
      this.checkEmptySpaces(this.commentForm.controls['body'].value) &&
      postId
    ) {
      const comment = {
        body: this.commentForm.controls['body'].value,
        post: postId
      } as Comment;
      this.store.dispatch(new CreateCommentAction(comment)).subscribe(() => {
        this.commentForm.reset();
        this.store.dispatch(new FetchCommentsAction(postId));
        this.commentError.set('');
      });
    } else {
      this.store.dispatch(new CommentErrorAction('Missing data in the comment'));
    }
  }

  canCurrentUserEditComment(comment: Comment): boolean {
    return (
      (comment?.user?.username &&
        this.currentUser()?.username &&
        comment.user.username === this.currentUser()?.username) ||
      this.isStaff(this.currentUser()) ||
      this.isAdmin(this.currentUser())
    );
  }

  isCommentFromPostOwner(comment: Comment): boolean {
    return Boolean(this.post()?.author?.username === this.getName(comment));
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
