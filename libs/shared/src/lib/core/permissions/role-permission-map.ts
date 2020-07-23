import { RoleEnum } from './roleEnum';
import { Permission } from './permission';
import { InjectionToken } from '@angular/core';

export const rolePermissionMap = new Map<RoleEnum, Permission[]>();

// Authenticated role permissions list
rolePermissionMap.set(RoleEnum.authenticated, []);

// Staff role permissions list
rolePermissionMap.set(RoleEnum.staff, [
  Permission.EDIT_ANY_ARTICLE,
  Permission.EDIT_TAGS_IN_ARTICLE
]);

// Admin role permissions list
rolePermissionMap.set(RoleEnum.administrator, [
  Permission.EDIT_ANY_ARTICLE,
  Permission.REMOVE_ANY_ARTICLE,
  Permission.EDIT_TAGS_IN_ARTICLE,
  Permission.PUBLISH_ARTICLE,
]);

export class Permissions {
  permissions() {
    return Permission;
  }
}

export const ROLE_PERMISSION_MAP = new InjectionToken<Map<RoleEnum, Permission[]>>('ROLE_PERMISSION_MAP');
