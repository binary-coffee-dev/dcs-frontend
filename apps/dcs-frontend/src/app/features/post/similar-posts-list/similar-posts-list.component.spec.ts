import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Store} from '@ngxs/store';

import {SimilarPostsListComponent} from './similar-posts-list.component';
import {of} from 'rxjs';

class StoreStub {
  select = jest.fn();
}

describe('SimilarPostsListComponent', () => {
  let component: SimilarPostsListComponent;
  let fixture: ComponentFixture<SimilarPostsListComponent>;
  let store: StoreStub;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarPostsListComponent],
      providers: [{provide: Store, useClass: StoreStub}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPostsListComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);
    spyOn(store, 'select').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
