import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { ProviderGuard } from '../../core/guards/provider.guard';
import { MaterialModule } from '@dcs-libs/shared';

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
    RouterModule.forChild(routes),
    MaterialModule
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
