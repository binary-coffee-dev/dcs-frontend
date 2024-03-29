import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeResolver } from '@dcs-libs/shared';
import { PrivacyComponent } from './features/info/privacy/privacy.component';
import { CookiesComponent } from './features/info/cookies/cookies.component';
import { AboutComponent } from './features/info/about/about.component';
import { CodeOfConductComponent } from './features/info/code-of-conduct/code-of-conduct.component';
import { TermOfUseComponent } from './features/info/term-of-use/term-of-use.component';

const routes: Routes = [
  {
    path: '',
    resolve: { me: MeResolver },
    children: [
      {
        path: '',
        data: {
          isHome: true
        },
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
        path: 'unsubscribe/:unsubscribe_token',
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
        path: 'users',
        loadChildren: () => import('./features/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'privacy-policy',
        component: PrivacyComponent
      },
      {
        path: 'cookies',
        component: CookiesComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'code-of-conduct',
        component: CodeOfConductComponent
      },
      {
        path: 'term-of-use',
        component: TermOfUseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  providers: [MeResolver],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
