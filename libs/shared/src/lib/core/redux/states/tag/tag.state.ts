import { Injectable, inject } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { TagService } from './tag.service';
import { FetchTagsAction } from './tag.action';
import { PaginationBaseClass } from '../pagination-base.class';
import { initTagStateModel, TagStateModel } from './tag-state.model';
import { Tag } from '../../models';

@State<TagStateModel>({
  name: 'tag',
  defaults: initTagStateModel()
})
@Injectable()
export class TagState extends PaginationBaseClass<TagStateModel> {
  private tagService = inject(TagService);


  @Selector()
  static tags(state: TagStateModel): Tag[] {
    return state.elements;
  }

  @Action(FetchTagsAction)
  fetchTagsAction(ctx: StateContext<TagStateModel>) {
    ctx.patchState({elements: []});
    return this.tagService.fetchTags().pipe(tap(taps => ctx.patchState({elements: taps})));
  }
}
