import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PodcastComponent } from './podcast.component';
import { EspacioBinarioComponent } from './espacio-binario/espacio-binario.component';


const routes: Routes = [
  {
    path: '',
    component: PodcastComponent
  },
  {
    path: 'espacio-binario',
    component: EspacioBinarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodcastRoutingModule {
}
