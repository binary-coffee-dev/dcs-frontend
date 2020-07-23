import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { TagService } from '../services';
import { FetchTagsAction } from '../actions';
import { PaginationBaseClass } from './pagination-base.class';
import { initTagStateModel, TagStateModel } from './tag-state.model';
import { Tag } from '../models';

@State<TagStateModel>({
  name: 'tag',
  defaults: initTagStateModel()
})
export class TagState extends PaginationBaseClass<TagStateModel> {

  @Selector()
  static tags(state: TagStateModel): Tag[] {
    return state.elements;
  }

  constructor(private tagService: TagService) {
    super();
  }

  @Action(FetchTagsAction)
  fetchTagsAction(ctx: StateContext<TagStateModel>) {
    ctx.patchState({elements: []});
    return this.tagService.fetchTags().pipe(tap(taps => ctx.patchState({elements: taps})));
  }
}
