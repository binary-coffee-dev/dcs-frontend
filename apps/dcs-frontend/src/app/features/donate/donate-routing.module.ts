import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonateComponent } from './donate.component';

const routes: Routes = [
  {
    path: '',
    component: DonateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule {
}
