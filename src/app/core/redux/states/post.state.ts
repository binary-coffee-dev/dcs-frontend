import {Action, Selector, State, StateContext} from '@ngxs/store';

import {PostService} from '../services';
import {FetchPostsAction} from '../actions';
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

  constructor(private postService: PostService) {
  }

  @Action(FetchPostsAction)
  fetchPostsAction(ctx: StateContext<PostStateModel>) {
    return this.postService.fetchPosts().subscribe((posts) => ctx.patchState({posts}));
  }

}
