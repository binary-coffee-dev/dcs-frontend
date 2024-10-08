import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { Store } from '@ngxs/store';

import { UploadFileModalComponent } from './upload-file.modal.component';


class StoreStub {
}

class MatDialogRefStub {
}

describe('UploadFile.ModalComponent', () => {
  let component: UploadFileModalComponent;
  let fixture: ComponentFixture<UploadFileModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UploadFileModalComponent],
      providers: [
        {provide: Store, useClass: StoreStub},
        {provide: MatDialogRef, useClass: MatDialogRefStub},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
