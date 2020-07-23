import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { Store } from '@ngxs/store';

import { ListComponent } from './list.component';
import { ENVIRONMENT, ROLE_PERMISSION_MAP, rolePermissionMap } from '@dcs-libs/shared';
import { HasPermissionsPipe } from '@dcs-libs/shared';

class StoreStub {
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, HasPermissionsPipe],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: ENVIRONMENT, useValue: {}},
        {provide: ROLE_PERMISSION_MAP, useValue: rolePermissionMap}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngOnInit').and.callFake(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
