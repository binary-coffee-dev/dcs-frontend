import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {PostService} from './services';
import {CommentState, PostState} from './states';
import {GraphQLModule} from '../graphql';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsModule.forRoot([PostState, CommentState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [PostService]
})
export class ReduxModule {
}
