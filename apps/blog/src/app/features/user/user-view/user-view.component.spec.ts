import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { of } from 'rxjs';
import { Store } from '@ngxs/store';

import { ENVIRONMENT, WINDOW } from '@dcs-libs/shared';
import { UserViewComponent } from './user-view.component';
import { ActivatedRoute } from '@angular/router';

class StoreStub {
  select = () => of([]);
}

class ActivatedRouteStub {
  data = of({});
}

describe('UserViewComponent', () => {
  let component: UserViewComponent;
  let fixture: ComponentFixture<UserViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: ENVIRONMENT, useValue: {} },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: ENVIRONMENT, useValue: {} },
        { provide: WINDOW, useValue: {} },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
