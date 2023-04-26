import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_LEGACY_DIALOG_DATA, MatLegacyDialogRef } from '@angular/material/legacy-dialog';

import { Store } from '@ngxs/store';

import { EditCommentModalComponent } from './edit-comment.modal.component';

class StoreStub {
}

class MatDialogRefStub {
}

describe('EditCommentModalComponent', () => {
  let component: EditCommentModalComponent;
  let fixture: ComponentFixture<EditCommentModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EditCommentModalComponent],
      providers: [
        {provide: MatLegacyDialogRef, useClass: MatDialogRefStub},
        {provide: Store, useClass: StoreStub},
        {provide: MAT_LEGACY_DIALOG_DATA, useValue: {comment: {body: 'tmp'}}}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
