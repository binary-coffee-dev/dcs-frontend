import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { LoginRequestModalComponent } from './login-request-modal.component';
import { LoginService } from '../../../core/services';


class MatDialogRefStub {
}

class LoginServiceStub {
}

describe('LoginRequestModalComponent', () => {
  let component: LoginRequestModalComponent;
  let fixture: ComponentFixture<LoginRequestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRequestModalComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefStub },
        { provide: LoginService, useClass: LoginServiceStub }
      ],
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
