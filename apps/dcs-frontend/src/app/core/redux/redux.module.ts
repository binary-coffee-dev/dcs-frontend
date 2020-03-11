import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

import {AuthState, PostState} from '@dcs-libs/shared';
import {CommentService} from './services';
import {CommentState} from './states';
import {GraphQLModule} from '../graphql';
import {environment} from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([CommentState, AuthState, PostState], {
      developmentMode: !environment.production
    })
  ],
  providers: [CommentService]
})
export class ReduxModule {
}
