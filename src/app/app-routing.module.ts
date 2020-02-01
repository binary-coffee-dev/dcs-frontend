import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ContactComponent} from './features/info/contact/contact.component';
import {AboutComponent} from './features/info/about/about.component';
import {QuestionsComponent} from './features/info/questions/questions.component';
import {JoinComponent} from './features/info/join/join.component';
import {TecsComponent} from './features/info/tecs/tecs.component';
import {DcsCommunityComponent} from './features/info/dcs-community/dcs-community.component';
import {FeedbackComponent} from './features/info/feedback/feedback.component';
import {DevTeamComponent} from './features/info/dev-team/dev-team.component';
import {PublishComponent} from './features/info/publish/publish.component';
import {WriteTeamComponent} from './features/info/write-team/write-team.component';

const routes: Routes = [
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
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'questions',
    component: QuestionsComponent
  },
  {
    path: 'join',
    component: JoinComponent
  },
  {
    path: 'tecs',
    component: TecsComponent
  },
  {
    path: 'dcs-community',
    component: DcsCommunityComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: 'dev-team',
    component: DevTeamComponent
  },
  {
    path: 'publish',
    component: PublishComponent
  },
  {
    path: 'write-team',
    component: WriteTeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
