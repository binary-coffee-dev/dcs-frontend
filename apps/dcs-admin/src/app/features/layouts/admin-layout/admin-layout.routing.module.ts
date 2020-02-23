import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AdminLayoutComponent} from './admin-layout.component';
import {MeResolver} from './me.resolver';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    resolve: {me: MeResolver},
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user-profile',
        loadChildren: () => import('../../user-profile/user-profile.module').then(m => m.UserProfileModule)
      },
      {
        path: 'articles',
        loadChildren: () => import('../../article/article.module').then(m => m.ArticleModule)
      },
      {
        path: 'files',
        loadChildren: () => import('../../file/file.module').then(m => m.FileModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [MeResolver],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {
}
