import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTeamComponent } from './dev-team.component';

describe('DevTeamComponent', () => {
  let component: DevTeamComponent;
  let fixture: ComponentFixture<DevTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
