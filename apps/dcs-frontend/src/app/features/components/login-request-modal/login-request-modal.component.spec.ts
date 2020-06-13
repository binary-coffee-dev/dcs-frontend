import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRequestModalComponent } from './login-request-modal.component';

describe('LoginRequestModalComponent', () => {
  let component: LoginRequestModalComponent;
  let fixture: ComponentFixture<LoginRequestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRequestModalComponent ]
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
