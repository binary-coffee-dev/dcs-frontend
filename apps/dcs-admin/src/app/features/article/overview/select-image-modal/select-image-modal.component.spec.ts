import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectImageModalComponent} from './select-image-modal.component';

describe('SelectImageModalComponent', () => {
  let component: SelectImageModalComponent;
  let fixture: ComponentFixture<SelectImageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectImageModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
