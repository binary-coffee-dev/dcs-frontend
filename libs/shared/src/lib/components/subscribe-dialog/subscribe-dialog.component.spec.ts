import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SubscribeDialogComponent } from './subscribe-dialog.component';
import { Store } from '@ngxs/store';

class MatDialogRefStub {
}

class StoreStub {
}

describe('SubscribeDialogComponent', () => {
  let component: SubscribeDialogComponent;
  let fixture: ComponentFixture<SubscribeDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SubscribeDialogComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MatDialogRef, useClass: MatDialogRefStub},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
