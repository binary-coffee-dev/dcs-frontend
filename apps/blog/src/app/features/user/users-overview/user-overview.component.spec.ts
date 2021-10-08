import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UsersOverviewComponent } from './users-overview.component';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { UrlUtilsService } from '@dcs-libs/shared';

class StoreStub {
  select = jest.fn();
  dispatch = jest.fn();
}

class UrlUtilsServiceStub {
}

describe('UserComponent', () => {
  let component: UsersOverviewComponent;
  let fixture: ComponentFixture<UsersOverviewComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsersOverviewComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: UrlUtilsService, useClass: UrlUtilsServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOverviewComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    jest.spyOn(store, 'select').mockReturnValue(of());
    jest.spyOn(store, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
