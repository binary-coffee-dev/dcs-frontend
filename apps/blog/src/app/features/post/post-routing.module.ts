import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { PostComponent } from './post.component';
import { PostResolver } from './post-resolver';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    resolve: {
      post: PostResolver
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MarkdownModule.forRoot()
  ],
  exports: [RouterModule]
})
export class PostRoutingModule {
}
