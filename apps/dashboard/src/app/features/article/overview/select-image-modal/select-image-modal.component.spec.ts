import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { of } from 'rxjs';
import { Store } from '@ngxs/store';

import { StateBase, UrlUtilsService } from '@dcs-libs/shared';
import { SelectImageModalComponent } from './select-image-modal.component';

class StoreStub {
  select = (func: Function) => {
    switch (Object.getPrototypeOf(func).name) {
      case 'files':
        return of([]);
      case 'pageIndicators':
        return of({ page: 1, count: 1, pageSize: 5 } as StateBase);
      default:
        return of();
    }
  };
  dispatch = jest.fn();
}

class MatDialogRefStub {}

class UrlUtilsServiceStub {}

describe('SelectImageModalComponent', () => {
  let component: SelectImageModalComponent;
  let fixture: ComponentFixture<SelectImageModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectImageModalComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
