import { TestBed, waitForAsync } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PostState } from './post.state';
import { PostService } from './post.service';

class PostServiceStub {
  fetchPosts = jest.fn();
  fetchPost = jest.fn();
}


describe('PostState', () => {
  let store: Store;
  let postService: PostService;
  let postState: PostState;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PostState])],
      providers: [
        {provide: PostService, useClass: PostServiceStub}
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    postService = TestBed.inject(PostService);
    postState = TestBed.inject(PostState);
  }));

  it('should create', () => {
    expect(postState).toBeTruthy();
  });
});
