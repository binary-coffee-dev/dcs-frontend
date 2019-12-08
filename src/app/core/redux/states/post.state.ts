import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';

import {PostService} from '../services';
import {FetchPostAction, FetchPostsAction} from '../actions';
import {initPostStateModel, PostStateModel} from './post-state.model';
import {Post} from '../models';

@State<PostStateModel>({
  name: 'post',
  defaults: initPostStateModel()
})
export class PostState {

  @Selector()
  static posts(state: PostStateModel): Post[] {
    return state.posts;
  }

  @Selector()
  static post(state: PostStateModel): Post {
    return state.post;
  }

  constructor(private postService: PostService) {
  }

  @Action(FetchPostsAction)
  fetchPostsAction(ctx: StateContext<PostStateModel>) {
    return this.postService.fetchPosts().pipe(tap(posts => {
      ctx.patchState({posts});
    }));
  }

  @Action(FetchPostAction)
  fetchPostAction(ctx: StateContext<PostStateModel>, action: FetchPostAction) {
    return this.postService.fetchPost(action.postId).pipe(tap(post => ctx.patchState({post})));
  }

}
