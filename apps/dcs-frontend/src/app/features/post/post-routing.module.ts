import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownModule } from 'ngx-markdown';

import { PostComponent } from './post.component';
import { PostGuard } from './guards';

const routes: Routes = [
  {
    path: '',
    component: PostComponent,
    canActivate: [PostGuard]
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
