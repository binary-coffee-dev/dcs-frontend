import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { UserViewComponent } from './user-view.component';
import { ENVIRONMENT } from '@dcs-libs/shared';

class StoreStub {
  select = jest.fn();
}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;
  let store: StoreStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: ENVIRONMENT, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
