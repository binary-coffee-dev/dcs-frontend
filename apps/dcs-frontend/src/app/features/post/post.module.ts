import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { TagsModule } from '@dcs-libs/shared';
import { PostComponent } from './post.component';
import { PostRoutingModule } from './post-routing.module';
import { PostGuard } from './guards';
import { MaterialModule } from '../../core/material';
import { ServicesModule } from '../../core/services';
import { CommentsComponent } from './comments/comments.component';
import { ShareButtonsComponent } from './share-buttons/share-buttons.component';

@NgModule({
  declarations: [
    PostComponent,
    CommentsComponent,
    ShareButtonsComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    ServicesModule,
    TagsModule
  ],
  providers: [PostGuard]
})
export class PostModule {
}
