import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthComponent} from './auth.component';
import {ProviderGuard} from '../../core/guards/provider.guard';
import {AuthGuard} from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: ':provider',
    canActivate: [ProviderGuard, AuthGuard],
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
