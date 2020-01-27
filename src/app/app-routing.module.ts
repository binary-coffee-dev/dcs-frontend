import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from "./features/info/contact/contact.component";
import { AboutComponent } from "./features/info/about/about.component";
import { QuestionsComponent } from "./features/info/questions/questions.component";
import { SiteMapComponent } from "./features/info/site-map/site-map.component";

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
    path: 'site-map',
    component: SiteMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
