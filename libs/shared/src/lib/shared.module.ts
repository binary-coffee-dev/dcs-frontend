import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './features/loading/loading.component';
import { WINDOW, windowFactory } from './core/models';
import { HasPermissionsPipe } from './core/pipes';
import { ROLE_PERMISSION_MAP, rolePermissionMap } from './core/permissions';
import { CookiesConsentComponent } from './features/cookies-consent';
import { MaterialModule } from './core/material';
import { ConfirmationDialogComponent } from './components/confirmation-dialog';
import { SubscribeDialogComponent } from './components/subscribe-dialog';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [
    LoadingComponent,
    HasPermissionsPipe,
    CookiesConsentComponent,
    ConfirmationDialogComponent,
    SubscribeDialogComponent
  ],
  exports: [
    LoadingComponent,
    HasPermissionsPipe,
    CookiesConsentComponent
  ],
  providers: [
    { provide: WINDOW, useFactory: windowFactory },
    { provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap }
  ]
})
export class SharedModule {
}
