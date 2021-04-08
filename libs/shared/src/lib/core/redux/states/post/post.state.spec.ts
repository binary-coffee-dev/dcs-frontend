import { async, TestBed } from '@angular/core/testing';

import { NgxsModule, Store } from '@ngxs/store';

import { PostState } from './post.state';
import { PostService } from '../../services';

class PostServiceStub {
  fetchPosts = jest.fn();
  fetchPost = jest.fn();
}


describe('PostState', () => {
  let store: Store;
  let postService: PostServiceStub;
  let postState: PostState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PostState])],
      providers: [
        {provide: PostService, useClass: PostServiceStub}
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    postService = TestBed.get(PostService);
    postState = TestBed.get(PostState);
  }));

  it('should create', () => {
    expect(postState).toBeTruthy();
  });
});
