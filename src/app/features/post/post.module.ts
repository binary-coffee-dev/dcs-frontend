import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarkdownModule} from 'ngx-markdown';

import {PostComponent} from './post.component';
import {PostRoutingModule} from './post-routing.module';
import {PostGuard} from './guards';
import {MaterialModule} from '../../core/material';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    MarkdownModule.forRoot()
  ],
  providers: [PostGuard]
})
export class PostModule {
}
