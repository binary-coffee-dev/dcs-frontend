import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MAT_LEGACY_DIALOG_DATA, MatLegacyDialogRef } from '@angular/material/legacy-dialog';

import { Store } from '@ngxs/store';

import { ConfirmDeleteModalComponent } from './confirm-delete.modal.component';

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
        {provide: MatLegacyDialogRef, useClass: MatDialogRefStub},
        {provide: Store, useClass: StoreStub},
        {provide: MAT_LEGACY_DIALOG_DATA, useValue: {}}
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
