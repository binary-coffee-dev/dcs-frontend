import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialog } from '@angular/material';

import { DonateComponent } from './donate.component';
import { ScrollService } from '../../core/services';

class MatDialogStub {
}

class ScrollServiceStub {
  smoothScroll = jest.fn();
}

describe('DonateComponent', () => {
  let component: DonateComponent;
  let fixture: ComponentFixture<DonateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DonateComponent],
      providers: [
        {provide: MatDialog, useClass: MatDialogStub},
        {provide: ScrollService, useClass: ScrollServiceStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
