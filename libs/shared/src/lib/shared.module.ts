import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from './features/loading/loading.component';
import { WINDOW, windowFactory } from './core/models';
import { HasPermissionsPipe } from './core/pipes/has-permissions.pipe';
import { HasPermissionsPipeStub } from "./core/pipes/has-permissions.pipe.stub";
import { ROLE_PERMISSION_MAP, rolePermissionMap } from './core/permissions';

@NgModule({
  imports: [CommonModule],
  declarations: [
    LoadingComponent,
    HasPermissionsPipe,
    HasPermissionsPipeStub
  ],
  exports: [
    LoadingComponent,
    HasPermissionsPipe,
    HasPermissionsPipeStub
  ],
  providers: [
    { provide: WINDOW, useFactory: windowFactory },
    { provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap }
  ]
})
export class SharedModule {
}
