import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatLegacyDialog } from '@angular/material/legacy-dialog';

import { Store } from '@ngxs/store';

import { ENVIRONMENT } from '@dcs-libs/shared';
import { AppComponent } from './app.component';
import { MetaTagsService } from '../core/services';

class StoreStub {
  dispatch = jest.fn();
}

class MetaTagsServiceStub {
}

class MatDialogStub {
}

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {provide: MatLegacyDialog, useClass: MatDialogStub},
        {provide: Store, useClass: StoreStub},
        {provide: ENVIRONMENT, useValue: {}},
        {provide: MetaTagsService, useClass: MetaTagsServiceStub}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
