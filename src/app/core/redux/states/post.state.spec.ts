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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([PostState])],
      providers: [
        {provide: PostService, useClass: PostServiceStub}
      ]
    }).compileComponents();
    store = TestBed.get(Store);
    postService = TestBed.get(PostService);
  }));

  it('should fetch the list of posts', (done) => {
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
});
