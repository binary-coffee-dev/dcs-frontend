import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

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
        {provide: MatDialogRef, useClass: MatDialogRefStub},
        {provide: Store, useClass: StoreStub},
        {provide: MAT_DIALOG_DATA, useValue: {comment: {body: 'tmp'}}}
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
