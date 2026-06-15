import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { of } from 'rxjs';
import { Store } from '@ngxs/store';

import { UrlUtilsService } from '@dcs-libs/shared';
import { UserProfileComponent } from './user-profile.component';

class StoreStub {
  select = () => of({});
}

class MatDialogStub {}

class UrlUtilsServiceStub {
  getUserImage = jest.fn();
}

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserProfileComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: MatDialog, useClass: MatDialogStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
