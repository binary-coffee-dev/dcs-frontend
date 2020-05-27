import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

import {RecentCommentsComponent} from './recent-comments.component';
import {LimitTextPipe} from './limit-text.pipe';
import {Store} from '@ngxs/store';

class StoreStub {
  select = jest.fn();
}

describe('RecentCommentsComponent', () => {
  let component: RecentCommentsComponent;
  let fixture: ComponentFixture<RecentCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentCommentsComponent, LimitTextPipe],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{provide: Store, useClass: StoreStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentCommentsComponent);
    component = fixture.componentInstance;

    spyOn(component, 'ngOnInit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
