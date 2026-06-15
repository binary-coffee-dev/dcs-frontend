import { TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';

import {
  Permission,
  ROLE_PERMISSION_MAP,
  rolePermissionMap,
} from '../permissions';
import { HasPermissionsPipe } from './has-permissions.pipe';

class StoreStub {
  selectSnapshot = jest.fn();
}

describe('HasPermissionsPipe', () => {
  let pipe: HasPermissionsPipe;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HasPermissionsPipe],
      providers: [
        HasPermissionsPipe,
        { provide: Store, useClass: StoreStub },
        { provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap },
      ],
    });
    pipe = TestBed.inject(HasPermissionsPipe);
    store = TestBed.inject(Store);
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

    const actual = pipe.transform([
      Permission.REMOVE_ANY_ARTICLE,
      Permission.EDIT_ANY_ARTICLE,
    ]);

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
