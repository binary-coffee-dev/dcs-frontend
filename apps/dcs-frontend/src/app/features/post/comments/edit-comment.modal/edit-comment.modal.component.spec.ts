import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComment.ModalComponent } from './edit-comment.modal.component';

describe('EditComment.ModalComponent', () => {
  let component: EditComment.ModalComponent;
  let fixture: ComponentFixture<EditComment.ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditComment.ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComment.ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
