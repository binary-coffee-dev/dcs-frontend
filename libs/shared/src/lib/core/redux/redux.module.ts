import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { GraphQLModule } from '../graphql';
import { FileService } from './states/file';
import { TagService } from './states/tag';
import { PodcastService } from './states/podcast';

@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({key: ['auth', 'config']})
  ],
  providers: [FileService, TagService, PodcastService]
})
export class ReduxModule {
}
