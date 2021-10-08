import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

import { Subject } from 'rxjs';

import { AdminLayoutComponent } from './admin-layout.component';

class ChangeDetectorRefStub {
  detectChanges = jest.fn();
}

class MediaMatcherStub {
  matchMedia = () => ({addEventListener: jest.fn()});
}

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  const location = new Subject();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminLayoutComponent],
      providers: [
        {provide: ChangeDetectorRef, useClass: ChangeDetectorRefStub},
        {provide: MediaMatcher, useClass: MediaMatcherStub}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    jest.spyOn(component, 'ngOnDestroy').mockImplementation(jest.fn());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
