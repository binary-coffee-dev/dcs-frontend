import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';


import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { MaterialModule, Post } from '@dcs-libs/shared';
import { SimilarPostsListComponent } from './similar-posts-list.component';
import { ResourceService } from '../../../core/services';

class StoreStub {
  select = jest.fn();
}

class ResourceServiceStub {
}

describe('SimilarPostsListComponent', () => {
  let component: SimilarPostsListComponent;
  let fixture: ComponentFixture<SimilarPostsListComponent>;
  let store: StoreStub;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimilarPostsListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useClass: StoreStub },
        { provide: ResourceService, useClass: ResourceServiceStub }
      ],
      imports: [MaterialModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimilarPostsListComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get only the first 9 posts', () => {
    component.loadPosts(new Array(20).fill(null).map(() => ({} as Post)));

    expect(component.posts.length).toEqual(9);
  });
});
