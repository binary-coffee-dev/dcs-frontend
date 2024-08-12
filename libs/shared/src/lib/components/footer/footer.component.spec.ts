import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UrlUtilsService } from '@dcs-libs/shared';
import { FooterComponent } from './footer.component';

class UrlUtilsServiceStub {
  normalizeSiteUrl = jest.fn();
}

class MatDialogStub {
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [FooterComponent],
      providers: [
        {provide: MatDialog, useClass: MatDialogStub},
        {provide: UrlUtilsService, useClass: UrlUtilsServiceStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
