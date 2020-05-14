import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { MaterialModule, SharedModule, TagsModule } from '@dcs-libs/shared';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostGuard } from './guards';
import { ServicesModule } from '../../core/services';
import { CommentsComponent } from './comments/comments.component';
import { ShareButtonsComponent } from './share-buttons/share-buttons.component';
import { SimilarPostsListComponent } from './similar-posts-list/similar-posts-list.component';

@NgModule({
  declarations: [
    PostComponent,
    CommentsComponent,
    ShareButtonsComponent,
    SimilarPostsListComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    ServicesModule,
    TagsModule,
    SharedModule
  ],
  providers: [PostGuard]
})
export class PostModule {
}
