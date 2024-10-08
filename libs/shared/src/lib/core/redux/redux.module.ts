import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { GraphQLModule } from '../graphql';
import { FileService } from './states/file';
import { TagService } from './states/tag';
import { PodcastService } from './states/podcast';
import { UserInfoService } from './states/user-info';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({keys: ['auth', 'config']})
  ],
  providers: [FileService, TagService, PodcastService, UserInfoService]
})
export class ReduxModule {
}
