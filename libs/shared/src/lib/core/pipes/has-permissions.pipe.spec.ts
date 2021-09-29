import { Store } from '@ngxs/store';

import { Permission, RoleEnum } from '../permissions';
import { HasPermissionsPipe } from './has-permissions.pipe';

describe('HasPermissionsPipe', () => {
  let pipe: HasPermissionsPipe;
  let store: Store;

  beforeEach(() => {
    store = {
      selectSnapshot: jest.fn
    } as unknown as Store;
    const map = new Map<RoleEnum, Permission[]>();
    map.set(RoleEnum.authenticated, []);
    map.set(RoleEnum.staff, [
      Permission.EDIT_ANY_ARTICLE
    ]);
    pipe = new HasPermissionsPipe(store, map);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false if the permissions are not in the list', () => {
    jest.spyOn(store, 'selectSnapshot').mockReturnValue('authenticated');

    const actual = pipe.transform([Permission.REMOVE_ANY_ARTICLE]);

    expect(actual).toEqual(false);
  });

  it('should return false if the permissions are not in the list (example 2)', () => {
    jest.spyOn(store, 'selectSnapshot').mockReturnValue('staff');

    const actual = pipe.transform([Permission.REMOVE_ANY_ARTICLE, Permission.EDIT_ANY_ARTICLE]);

    expect(actual).toEqual(false);
  });

  it('should return true if the permissions are in the list', () => {
    jest.spyOn(store, 'selectSnapshot').mockReturnValue('staff');

    const actual = pipe.transform([Permission.EDIT_ANY_ARTICLE]);

    expect(actual).toEqual(true);
  });

  it('should return false if the user do not have role', () => {
    jest.spyOn(store, 'selectSnapshot').mockReturnValue(null);

    const actual = pipe.transform([Permission.EDIT_ANY_ARTICLE]);

    expect(actual).toEqual(false);
  });
});
