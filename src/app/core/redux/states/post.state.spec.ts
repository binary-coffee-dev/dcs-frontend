import {async, TestBed} from '@angular/core/testing';

import {NgxsModule, StateContext, Store} from '@ngxs/store';
import {of} from 'rxjs';

import {PostState} from './post.state';
import {PostService} from '../services';
import {FetchPostAction, FetchPostsAction, NextPageAction, PreviousPageAction} from '../actions';
import {Post, PostConnection} from '../models';
import {PostStateModel} from './post-state.model';
import {combineAll} from 'rxjs/operators';

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

  it('should fetch the list of posts', (done) => {
    jest.spyOn(postState, 'fetchPage').mockReturnValue(of({} as PostConnection));
    store.dispatch(new FetchPostsAction()).subscribe(() => {
      expect(postState.fetchPage).toHaveBeenCalled();
      done();
    });
  });

  it('should fetch next list of post', (done) => {
    jest.spyOn(postState, 'fetchPage').mockReturnValue(of({} as PostConnection));
    store.dispatch(new NextPageAction()).subscribe(() => {
      expect(postState.fetchPage).toHaveBeenCalled();
      done();
    });
  });

  it('should fetch previous list of post', (done) => {
    jest.spyOn(postState, 'fetchPage').mockReturnValue(of({} as PostConnection));
    store.dispatch(new PreviousPageAction()).subscribe(() => {
      expect(postState.fetchPage).toHaveBeenCalled();
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

  it('should set firstPage=true and lastPage=false', () => {
    const ctx = {patchState: jest.fn()} as unknown as StateContext<PostStateModel>;
    postState.refreshPaginationVisibility(ctx, 0, 2, 1);
    expect(ctx.patchState).toHaveBeenCalledWith({firstPage: true, lastPage: false});
  });

  it('should set firstPage=false and lastPage=true', () => {
    const ctx = {patchState: jest.fn()} as unknown as StateContext<PostStateModel>;
    postState.refreshPaginationVisibility(ctx, 1, 2, 1);
    expect(ctx.patchState).toHaveBeenCalledWith({firstPage: false, lastPage: true});
  });

  it('should set firstPage=true and lastPage=true', () => {
    const ctx = {patchState: jest.fn()} as unknown as StateContext<PostStateModel>;
    postState.refreshPaginationVisibility(ctx, 0, 1, 1);
    expect(ctx.patchState).toHaveBeenCalledWith({firstPage: true, lastPage: true});
  });

  it('should fetch list of posts', (done) => {
    jest.spyOn(postService, 'fetchPosts').mockReturnValue(of({
      values: POSTS_EXAMPLE,
      aggregate: {count: COUNT_EXAMPLE}
    } as PostConnection));
    jest.spyOn(postState, 'refreshPaginationVisibility').mockImplementation(jest.fn());
    const ctx = {patchState: jest.fn()} as unknown as StateContext<PostStateModel>;

    postState.fetchPage(PAGE_SIZE_EXAMPLE, START_PAGE_EXAMPLE, ctx, PAGE_EXAMPLE).subscribe(() => {
      expect(postService.fetchPosts).toHaveBeenCalledWith(PAGE_SIZE_EXAMPLE, START_PAGE_EXAMPLE);
      expect(ctx.patchState).toHaveBeenCalledWith({posts: POSTS_EXAMPLE, count: COUNT_EXAMPLE});
      expect(postState.refreshPaginationVisibility).toHaveBeenCalledWith(ctx, PAGE_EXAMPLE, COUNT_EXAMPLE, PAGE_SIZE_EXAMPLE);
      done();
    });
  });

  it('should fetch a null value', (done) => {
    jest.spyOn(postService, 'fetchPosts').mockReturnValue(of(null));
    jest.spyOn(postState, 'refreshPaginationVisibility').mockImplementation(jest.fn());
    const ctx = {patchState: jest.fn()} as unknown as StateContext<PostStateModel>;

    postState.fetchPage(PAGE_SIZE_EXAMPLE, START_PAGE_EXAMPLE, ctx, PAGE_EXAMPLE).subscribe(() => {
      expect(postService.fetchPosts).toHaveBeenCalledWith(PAGE_SIZE_EXAMPLE, START_PAGE_EXAMPLE);
      expect(ctx.patchState).toHaveBeenCalledWith({posts: [], count: 0});
      expect(postState.refreshPaginationVisibility).toHaveBeenCalledWith(ctx, PAGE_EXAMPLE, 0, PAGE_SIZE_EXAMPLE);
      done();
    });
  });
});
