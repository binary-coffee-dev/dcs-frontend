import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { EnzonaComponent } from './enzona.component';

describe('EnzonaComponent', () => {
  let component: EnzonaComponent;
  let fixture: ComponentFixture<EnzonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnzonaComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
