import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteTeamComponent } from './write-team.component';

describe('WriteTeamComponent', () => {
  let component: WriteTeamComponent;
  let fixture: ComponentFixture<WriteTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
