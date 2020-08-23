import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';


const routes: Routes = [
  {
    path: '',
    component: PodcastComponent
  },
  {
    path: 'espacio-binario',
    component: PodcastListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule {
}
