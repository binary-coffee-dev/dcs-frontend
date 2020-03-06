import {Role} from './role';
import {Permission} from './permission';

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
