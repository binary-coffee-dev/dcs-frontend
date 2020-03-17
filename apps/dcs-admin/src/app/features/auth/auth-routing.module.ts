import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {ProviderGuard} from '../../core/guards/provider.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: ':provider',
    canActivate: [ProviderGuard],
    component: AuthComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
