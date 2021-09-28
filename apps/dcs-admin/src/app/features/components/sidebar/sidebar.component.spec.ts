import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngxs/store';

import { UrlUtilsService } from '@dcs-libs/shared';
import { SidebarComponent } from './sidebar.component';

class StoreStub {
}

class UrlUtilsServiceStub {
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [{provide: Store, useClass: StoreStub}, {provide: UrlUtilsService, useClass: UrlUtilsServiceStub}],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
