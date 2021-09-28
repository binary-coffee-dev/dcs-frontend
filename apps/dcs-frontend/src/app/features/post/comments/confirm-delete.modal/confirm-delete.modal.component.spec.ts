import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmDeleteModalComponent } from './confirm-delete.modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';

class StoreStub {
}

class MatDialogRefStub {
}

describe('ConfirmDelete.ModalComponent', () => {
  let component: ConfirmDeleteModalComponent;
  let fixture: ComponentFixture<ConfirmDeleteModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmDeleteModalComponent],
      providers: [
        {provide: MatDialogRef, useClass: MatDialogRefStub},
        {provide: Store, useClass: StoreStub},
        {provide: MAT_DIALOG_DATA, useValue: {}}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
