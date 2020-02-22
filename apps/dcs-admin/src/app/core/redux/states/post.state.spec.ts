import {async, TestBed} from '@angular/core/testing';

import {NgxsModule, StateContext, Store} from '@ngxs/store';
import {of} from 'rxjs';

import {PostState} from './post.state';
import {PostService} from '../services';
import {PostAction, FetchPostsAction, NextPageAction, PreviousPageAction} from '../actions';
import {Post, PostConnection} from '../models';
import {PostStateModel} from './post-state.model';

class PostServiceStub {
  fetchPosts = jest.fn();
  fetchPost = jest.fn();
}

const ID_EXAMPLE = '123';
const POST_EXAMPLE = {id: ID_EXAMPLE} as Post;
const PAGE_SIZE_EXAMPLE = 10;
const PAGE_EXAMPLE = 1;
const COUNT_EXAMPLE = 1;
const START_PAGE_EXAMPLE = 0;
const POSTS_EXAMPLE = [
  POST_EXAMPLE,
  {id: '12'} as Post
];

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
