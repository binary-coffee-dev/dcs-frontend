import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { ListComponent } from './list.component';
import {
  ENVIRONMENT,
  ROLE_PERMISSION_MAP,
  rolePermissionMap, UrlUtilsService, User,
} from '@dcs-libs/shared';
import { HasPermissionsPipe } from '@dcs-libs/shared';
import { of } from 'rxjs';

class StoreStub {
  select = (v: any) => {
    switch (Object.getPrototypeOf(v).name) {
      case 'me':
        return of({ role: { type: 'administrator' } } as User);
      case 'posts':
        return of([]);
      case 'pageIndicators':
        return of(1);
    }
    return of('');
  };
  dispatch = () => of();
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, HasPermissionsPipe],
      providers: [
        UrlUtilsService,
        { provide: Store, useClass: StoreStub },
        { provide: ENVIRONMENT, useValue: {} },
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
