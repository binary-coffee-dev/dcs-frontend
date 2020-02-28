import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {ListComponent} from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FileRoutingModule {
}
