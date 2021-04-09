import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLikeUsersComponent } from './top-like-users.component';

describe('TopLikeUsersComponent', () => {
  let component: TopLikeUsersComponent;
  let fixture: ComponentFixture<TopLikeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopLikeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLikeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
