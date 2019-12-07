import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MarkdownModule} from 'ngx-markdown';

import {PostComponent} from './post.component';
import {PostRoutingModule} from './post-routing.module';
import {PostGuard} from './guards';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MarkdownModule.forRoot()
  ],
  providers: [PostGuard]
})
export class PostModule {
}
