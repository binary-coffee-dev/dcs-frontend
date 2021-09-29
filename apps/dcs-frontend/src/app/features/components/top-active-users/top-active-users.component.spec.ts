import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';

import { TopActiveUsersComponent } from './top-active-users.component';
import { UrlUtilsService } from '@dcs-libs/shared';

class StoreStub {
  select = jest.fn();
}

class UrlUtilsServiceStub {
}

describe('TopActiveUsersComponent', () => {
  let component: TopActiveUsersComponent;
  let fixture: ComponentFixture<TopActiveUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TopActiveUsersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopActiveUsersComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
