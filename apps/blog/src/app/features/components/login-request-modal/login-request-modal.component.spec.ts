import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginRequestModalComponent } from './login-request-modal.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('LoginRequestModalComponent', () => {
  let component: LoginRequestModalComponent;
  let fixture: ComponentFixture<LoginRequestModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRequestModalComponent],
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
