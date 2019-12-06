import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {PostsResolver} from './resolvers';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      posts: PostsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
