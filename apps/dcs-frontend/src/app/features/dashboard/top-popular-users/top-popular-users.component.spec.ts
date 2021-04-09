import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPopularUsersComponent } from './top-popular-users.component';

describe('TopPopularUsersComponent', () => {
  let component: TopPopularUsersComponent;
  let fixture: ComponentFixture<TopPopularUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TopPopularUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPopularUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
