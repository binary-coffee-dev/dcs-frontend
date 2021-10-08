import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';
import { PostGuard } from '../../core/guards/post.guard';
import { CanLeave } from './overview/can-leave';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'create',
    component: OverviewComponent,
    canDeactivate: [CanLeave],
  },
  {
    path: 'update/:id',
    canActivate: [PostGuard],
    canDeactivate: [CanLeave],
    component: OverviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [CanLeave]
})
export class ArticleRoutingModule {
}
