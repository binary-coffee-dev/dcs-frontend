import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLabelComponent } from './new-label.component';

describe('NewLabelComponent', () => {
  let component: NewLabelComponent;
  let fixture: ComponentFixture<NewLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
