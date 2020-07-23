import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import { PostGuard } from '../../core/guards/post.guard';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: OverviewComponent
  },
  {
    path: 'update/:id',
    canActivate: [PostGuard],
    component: OverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticleRoutingModule {
}
