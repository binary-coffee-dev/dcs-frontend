import {Inject, Pipe, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';
import {Store} from '@ngxs/store';

import {AuthState} from '../redux/states';
import {Permission, Role, ROLE_PERMISSION_MAP} from '../permissions';

@Pipe({
  name: 'hasPermissions'
})
export class HasPermissionsPipe implements PipeTransform {

  private hasPermission = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store,
    @Inject(ROLE_PERMISSION_MAP) private rolePermissionMap: Map<Role, Permission[]>) {
  }

  transform(permissions: Permission[]): Observable<boolean> {
    const userRole = this.store.selectSnapshot(AuthState.role);
    if (userRole) {
      const permissionsByRole = this.rolePermissionMap.get(userRole) || [];
      const userHasPermissions = permissions.reduce((p, v) => {
        return p && permissionsByRole.findIndex(per => per === v) !== -1;
      }, true);
      this.hasPermission.next(userHasPermissions);
    }
    return this.hasPermission;
  }
}
