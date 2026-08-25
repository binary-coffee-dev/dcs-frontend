import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { ProviderGuard } from '../../core/guards/provider.guard';
import { MaterialModule } from '@dcs-libs/shared';
import { CleanAuthErrorsGuard } from '../../core/guards/clean-auth-errors.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'local',
    canActivate: [CleanAuthErrorsGuard],
    data: { provider: 'local' },
    component: AuthComponent
  },
  {
    path: ':provider',
    canActivate: [CleanAuthErrorsGuard, ProviderGuard],
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), MaterialModule],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
