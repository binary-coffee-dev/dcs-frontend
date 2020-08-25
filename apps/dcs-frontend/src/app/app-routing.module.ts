import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeResolver } from '@dcs-libs/shared';
import { PrivacyComponent } from './features/info/privacy/privacy.component';
import { CookiesComponent } from './features/info/cookies/cookies.component';

const routes: Routes = [
  {
    path: '',
    resolve: {me: MeResolver},
    children: [
      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'post/:id',
        loadChildren: () => import('./features/post/post.module').then(m => m.PostModule)
      },
      {
        path: 'verify/:token',
        loadChildren: () => import('./features/subscription/subscription.module').then(m => m.SubscriptionModule)
      },
      {
        path: 'subscribe',
        loadChildren: () => import('./features/subscription/subscription.module').then(m => m.SubscriptionModule)
      },
      {
        path: 'donate',
        loadChildren: () => import('./features/donate/donate.module').then(m => m.DonateModule)
      },
      {
        path: 'podcast',
        loadChildren: () => import('./features/podcast/podcast.module').then(m => m.PodcastModule)
      },
      {
        path: 'privacy-policy',
        component: PrivacyComponent
      },
      {
        path: 'cookies',
        component: CookiesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [MeResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
