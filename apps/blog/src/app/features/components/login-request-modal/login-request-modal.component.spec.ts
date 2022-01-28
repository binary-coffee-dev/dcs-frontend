import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { LoginRequestModalComponent } from './login-request-modal.component';


class MatDialogRefStub {
}

describe('LoginRequestModalComponent', () => {
  let component: LoginRequestModalComponent;
  let fixture: ComponentFixture<LoginRequestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRequestModalComponent],
      providers: [{ provide: MatDialogRef, useClass: MatDialogRefStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
