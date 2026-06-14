import { TestBed } from '@angular/core/testing';

import { NgxsModule } from '@ngxs/store';

import { PostState } from './post.state';
import { PostService } from './post.service';

class PostServiceStub {
  fetchPosts = jest.fn();
  fetchPost = jest.fn();
}

describe('PostState', () => {
  let postState: PostState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PostState])],
      providers: [{ provide: PostService, useClass: PostServiceStub }],
    }).compileComponents();
    postState = TestBed.inject(PostState);
  });

  it('should create', () => {
    expect(postState).toBeTruthy();
  });
});
