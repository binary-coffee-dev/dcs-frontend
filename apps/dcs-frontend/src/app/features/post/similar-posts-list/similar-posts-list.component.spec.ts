import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {Store} from '@ngxs/store';
import {of} from 'rxjs';

import {MaterialModule} from '@dcs-libs/shared';
import {SimilarPostsListComponent} from './similar-posts-list.component';

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
      providers: [{provide: Store, useClass: StoreStub}],
      imports: [MaterialModule, RouterTestingModule]
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
