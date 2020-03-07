import {Store} from '@ngxs/store';

import {Permission, Role} from '../permissions';
import {HasPermissionsPipe} from './has-permissions.pipe';

describe('HasPermissionsPipe', () => {
  let pipe: HasPermissionsPipe;
  let store: Store;

  beforeEach(() => {
    store = {
      selectSnapshot: jest.fn
    } as unknown as Store;
    const map = new Map<Role, Permission[]>();
    map.set(Role.authenticated, []);
    map.set(Role.staff, [
      Permission.EDIT_ANY_ARTICLE
    ]);
    pipe = new HasPermissionsPipe(store, map);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false if the permissions are not in the list', (end) => {
    spyOn(store, 'selectSnapshot').and.returnValue('authenticated');

    const actual = pipe.transform([Permission.REMOVE_ANY_ARTICLE]);

    actual.subscribe((allow) => {
      expect(allow).toEqual(false);
      end();
    });
  });

  it('should return false if the permissions are not in the list (example 2)', (end) => {
    spyOn(store, 'selectSnapshot').and.returnValue('staff');

    const actual = pipe.transform([Permission.REMOVE_ANY_ARTICLE, Permission.EDIT_ANY_ARTICLE]);

    actual.subscribe((allow) => {
      expect(allow).toEqual(false);
      end();
    });
  });

  it('should return true if the permissions are in the list', (end) => {
    spyOn(store, 'selectSnapshot').and.returnValue('staff');

    const actual = pipe.transform([Permission.EDIT_ANY_ARTICLE]);

    actual.subscribe((allow) => {
      expect(allow).toEqual(true);
      end();
    });
  });

  it('should return false if the user do not have role', (end) => {
    spyOn(store, 'selectSnapshot').and.returnValue(null);

    const actual = pipe.transform([Permission.EDIT_ANY_ARTICLE]);

    actual.subscribe((allow) => {
      expect(allow).toEqual(false);
      end();
    });
  });
});
