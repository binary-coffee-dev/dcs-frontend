import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';

import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { UrlUtilsService, WINDOW } from '@dcs-libs/shared';
import { InfoBarComponent } from './info-bar.component';
import { MomentService } from '../../../core/services';

class StoreStub {
  select = () => of([]);
}

class MomentServiceStub {
}

class UrlUtilsServiceStub {
}

describe('InfoBarComponent', () => {
  let component: InfoBarComponent;
  let fixture: ComponentFixture<InfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoBarComponent],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: MomentService, useClass: MomentServiceStub },
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub },
        { provide: WINDOW, useValue: {} },
        { provide: PLATFORM_ID, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
