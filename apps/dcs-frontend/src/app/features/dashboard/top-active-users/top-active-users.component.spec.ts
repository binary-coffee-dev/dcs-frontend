import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopActiveUsersComponent } from './top-active-users.component';

describe('TopActiveUsersComponent', () => {
  let component: TopActiveUsersComponent;
  let fixture: ComponentFixture<TopActiveUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopActiveUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
