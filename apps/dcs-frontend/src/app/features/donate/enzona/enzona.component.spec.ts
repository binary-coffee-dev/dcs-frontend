import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnzonaComponent } from './enzona.component';

describe('EnzonaComponent', () => {
  let component: EnzonaComponent;
  let fixture: ComponentFixture<EnzonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnzonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnzonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
