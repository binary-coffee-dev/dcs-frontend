import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TecsComponent } from './tecs.component';

describe('TecsComponent', () => {
  let component: TecsComponent;
  let fixture: ComponentFixture<TecsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TecsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
