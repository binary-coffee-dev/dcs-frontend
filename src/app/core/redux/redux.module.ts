import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {PostService} from './services';
import {PostState} from './states';
import {GraphQLModule} from '../graphql';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsModule.forRoot([PostState]),
  ],
  providers: [PostService]
})
export class ReduxModule {
}
