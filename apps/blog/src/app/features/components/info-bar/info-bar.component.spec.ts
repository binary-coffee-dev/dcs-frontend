import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Store } from '@ngxs/store';

import { UrlUtilsService } from '@dcs-libs/shared';
import { InfoBarComponent } from './info-bar.component';
import { MomentService } from '../../../core/services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

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
        { provide: UrlUtilsService, useClass: UrlUtilsServiceStub }
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
