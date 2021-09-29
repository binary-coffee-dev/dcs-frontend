import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { ENVIRONMENT, WINDOW } from '@dcs-libs/shared';
import { AuthComponent } from './auth.component';

class StoreStub {
}

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [RouterTestingModule],
      providers: [{provide: Store, useClass: StoreStub}, {provide: WINDOW, useValue: {}}, {provide: ENVIRONMENT, useValue: {}}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
