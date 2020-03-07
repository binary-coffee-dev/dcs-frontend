import {Role} from './role';
import {Permission} from './permission';
import {InjectionToken} from '@angular/core';

export const rolePermissionMap = new Map<Role, Permission[]>();

// Authenticated role permissions list
rolePermissionMap.set(Role.authenticated, []);

// Staff role permissions list
rolePermissionMap.set(Role.staff, [
  Permission.EDIT_ANY_ARTICLE
]);

// Admin role permissions list
rolePermissionMap.set(Role.administrator, [
  Permission.EDIT_ANY_ARTICLE,
  Permission.REMOVE_ANY_ARTICLE
]);

export const ROLE_PERMISSION_MAP = new InjectionToken<Map<Role, Permission[]>>('ROLE_PERMISSION_MAP');
