import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';
import { Store } from '@ngxs/store';
import { TagInputModule } from 'ngx-chips';

import { ENVIRONMENT, HasPermissionsPipeStub, MaterialModule, UrlUtilsService, WINDOW } from '@dcs-libs/shared';
import { OverviewComponent } from './overview.component';

class StoreStub {
  dispatch = jest.fn();
  select = jest.fn();
}

class MatDialogStub {
}

class UrlUtilsServiceStub {
}

const window = {
  document: {addEventListener: jest.fn()}
};

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let store: StoreStub;
  let fixture: ComponentFixture<OverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent, HasPermissionsPipeStub],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MatDialog, useClass: MatDialogStub},
        {provide: UrlUtilsService, useClass: UrlUtilsServiceStub},
        {provide: WINDOW, useValue: window},
        {provide: ENVIRONMENT, useValue: {}}
      ],
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule, TagInputModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
