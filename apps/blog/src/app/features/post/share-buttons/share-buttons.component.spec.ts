import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from '@angular/core';

import { ShareButtonsComponent } from './share-buttons.component';
import { WINDOW } from '@dcs-libs/shared';

describe('ShareButtonsComponent', () => {
  let component: ShareButtonsComponent;
  let fixture: ComponentFixture<ShareButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ShareButtonsComponent],
      providers: [
        { provide: WINDOW, useValue: {} },
        { provide: PLATFORM_ID, useValue: {} }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
