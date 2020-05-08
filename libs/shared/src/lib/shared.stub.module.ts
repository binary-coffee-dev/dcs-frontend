import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {WINDOW, windowFactory} from './core/models';
import {HasPermissionsPipeStub} from './core/pipes';
import {ROLE_PERMISSION_MAP, rolePermissionMap} from './core/permissions';

@NgModule({
  imports: [CommonModule],
  declarations: [
    HasPermissionsPipeStub
  ],
  exports: [
    HasPermissionsPipeStub
  ],
  providers: [
    {provide: WINDOW, useFactory: windowFactory},
    {provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap}
  ]
})
export class SharedStubModule {
}
