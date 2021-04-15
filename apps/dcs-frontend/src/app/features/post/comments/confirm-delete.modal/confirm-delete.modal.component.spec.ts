import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDelete.ModalComponent } from './confirm-delete.modal.component';

describe('ConfirmDelete.ModalComponent', () => {
  let component: ConfirmDelete.ModalComponent;
  let fixture: ComponentFixture<ConfirmDelete.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDelete.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDelete.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
