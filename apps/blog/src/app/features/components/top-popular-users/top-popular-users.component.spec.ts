import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store } from '@ngxs/store';

import { TopPopularUsersComponent } from './top-popular-users.component';
import { UrlUtilsService } from '@dcs-libs/shared';

class StoreStub {
  select = jest.fn();
}

class UrlUtilsServiceStub {
}

describe('TopPopularUsersComponent', () => {
  let component: TopPopularUsersComponent;
  let fixture: ComponentFixture<TopPopularUsersComponent>;
  TopPopularUsersComponent.prototype.ngOnInit = jest.fn();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TopPopularUsersComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPopularUsersComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnInit').mockImplementation(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
