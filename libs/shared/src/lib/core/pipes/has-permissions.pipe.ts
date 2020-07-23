import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '../redux/states';
import { Permission, ROLE_PERMISSION_MAP, RoleEnum } from '../permissions';

@Pipe({
  name: 'hasPermissions'
})
export class HasPermissionsPipe implements PipeTransform {

  constructor(
    private store: Store,
    @Inject(ROLE_PERMISSION_MAP) private rolePermissionMap: Map<RoleEnum, Permission[]>) {
  }

  transform(permissions: Permission[]): boolean {
    const userRole = this.store.selectSnapshot(AuthState.role);
    if (userRole) {
      const permissionsByRole = this.rolePermissionMap.get(userRole) || [];
      return permissions.reduce((p, v) => {
        return p && permissionsByRole.findIndex(per => per === v) !== -1;
      }, true);
    }
    return false;
  }
}
