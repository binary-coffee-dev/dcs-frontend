import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast.component';


const routes: Routes = [
  {
    path: '',
    component: PodcastComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule {
}
