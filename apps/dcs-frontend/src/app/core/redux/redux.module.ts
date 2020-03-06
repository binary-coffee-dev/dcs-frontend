import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {AuthState} from '@dcs-libs/shared';
import {CommentService, PostService} from './services';
import {CommentState, PostState} from './states';
import {GraphQLModule} from '../graphql';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsModule.forRoot([PostState, CommentState, AuthState], {
      developmentMode: !environment.production
    }),
  ],
  providers: [PostService, CommentService]
})
export class ReduxModule {
}
