import { Pipe, PipeTransform, inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { AuthState } from '../redux/states';
import { Permission, ROLE_PERMISSION_MAP, RoleEnum } from '../permissions';

@Pipe({
    name: 'hasPermissions',
    standalone: false
})
export class HasPermissionsPipe implements PipeTransform {
  private store = inject(Store);
  private rolePermissionMap = inject<Map<RoleEnum, Permission[]>>(ROLE_PERMISSION_MAP);

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
