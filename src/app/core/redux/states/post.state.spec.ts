import {async, TestBed} from '@angular/core/testing';

import {NgxsModule, Store} from '@ngxs/store';
import {of} from 'rxjs';

import {PostState} from './post.state';
import {PostService} from '../services';
import {FetchPostAction, FetchPostsAction} from '../actions';
import {Post} from '../models';

class PostServiceStub {
  fetchPosts = jest.fn();
  fetchPost = jest.fn();
}

const ID_EXAMPLE = '123';
const POST_EXAMPLE = {id: ID_EXAMPLE} as Post;
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

  xit('should fetch the list of posts', (done) => {
    jest.spyOn(postService, 'fetchPosts').mockReturnValue(of(POSTS_EXAMPLE));
    store.dispatch(new FetchPostsAction());
    store.selectOnce(PostState.posts).subscribe((posts) => {
      expect(posts).toEqual(POSTS_EXAMPLE);
      done();
    });
  });

  it('should fetch one post by id', (done) => {
    jest.spyOn(postService, 'fetchPost').mockReturnValue(of(POST_EXAMPLE));
    store.dispatch(new FetchPostAction(ID_EXAMPLE));
    store.selectOnce(PostState.post).subscribe((post) => {
      expect(post).toEqual(POST_EXAMPLE);
      expect(postService.fetchPost).toHaveBeenCalledWith(ID_EXAMPLE);
      done();
    });
  });

  it('should get the last page', () => {
    expect(postState.lastPage(43, 20)).toEqual(2);
    expect(postState.lastPage(10, 1)).toEqual(9);
    expect(postState.lastPage(0, 1)).toEqual(0);
    expect(postState.lastPage(0, 0)).toEqual(0);
  });

  it('should get the next page number', () => {
    expect(postState.nextPageNumber(0, 60, 20)).toEqual(1);
    expect(postState.nextPageNumber(1, 60, 20)).toEqual(2);
    expect(postState.nextPageNumber(2, 60, 20)).toEqual(2);
  });
});
