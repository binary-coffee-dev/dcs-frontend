import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Store } from '@ngxs/store';

import {
  ROLE_PERMISSION_MAP,
  rolePermissionMap,
  UrlUtilsService,
  User,
} from '@dcs-libs/shared';
import { ListComponent } from './list.component';
import { of } from 'rxjs';

class StoreStub {
  select = (v: any) => {
    switch (Object.getPrototypeOf(v).name) {
      case 'me':
        return of({role: {type: 'administrator'}} as User);
      case 'files':
        return of([]);
      case 'pageIndicators':
        return of(1);
    }
    return of();
  };
  dispatch = jest.fn();
}

class MatDialogStub {}

class UrlUtilsServiceStub {}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: MatDialog, useClass: MatDialogStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub },
        { provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
