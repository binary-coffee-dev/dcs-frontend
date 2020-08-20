import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthState, CreateLikeArticle, Post, PostState, RemoveLikeArticle } from '@dcs-libs/shared';
import { LoginRequestModalComponent } from '../../components/login-request-modal';
import { MomentService, ResourceService } from '../../../core/services';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit, OnDestroy {

  @Input() post: Post;

  likes = 0;
  userLike = 0;

  _unsubscribe = new Subject();

  constructor(
    private store: Store,
    public resource: ResourceService,
    private dialog: MatDialog,
    public moment: MomentService,
  ) {
  }

  ngOnInit(): void {
    this.store.select(PostState.likes)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(likes => this.likes = likes);
    this.store.select(PostState.userLike)
      .pipe(takeUntil(this._unsubscribe))
      .subscribe(userLike => this.userLike = userLike);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
  }

  postLikeTitle() {
    if (this.userLike > 0) {
      return 'Dejar sin café al autor';
    }
    return 'Invitarías a un café al autor';
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
