import { Component, inject, input, computed } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import {
  AuthState,
  CreateLikeArticle,
  MomentService,
  Post,
  PostState,
  RemoveLikeArticle,
} from '@dcs-libs/shared';
import { LoginRequestModalComponent } from '../../components/login-request-modal';
import { ResourceService } from '../../../core/services';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss'],
  standalone: false,
})
export class PostInfoComponent {
  private store = inject(Store);
  resource = inject(ResourceService);
  private dialog = inject(MatDialog);
  moment = inject(MomentService);

  post = input<Post | null>(null);

  user = toSignal(this.store.select(AuthState.me));
  likes = toSignal(this.store.select(PostState.likes), { initialValue: 0 });
  userLike = toSignal(this.store.select(PostState.userLike), {
    initialValue: 0,
  });
  postLikeTitle = computed(() =>
    this.userLike() > 0 ? '' : 'Chinchin con el autor'
  );

  postLikeClick() {
    if (!this.user()?.id) {
      this.dialog.open(LoginRequestModalComponent, {});
    }
    const userId = this.user()?.id;
    const postId = this.post()?.id;
    if (this.userLike() === 0 && userId && postId) {
      this.store.dispatch(
        new CreateLikeArticle(userId, postId)
      );
    } else if (userId && postId) {
      this.store.dispatch(new RemoveLikeArticle(postId));
    }
  }
}
