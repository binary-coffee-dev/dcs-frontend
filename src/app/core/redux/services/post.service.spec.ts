import {TestBed} from '@angular/core/testing';
import {Apollo} from 'apollo-angular';

import {of} from 'rxjs';

import {PostService} from './post.service';
import {Post} from '../models';
import {POST_QUERY, POSTS_QUERY} from '../../graphql/queries';

class ApolloStub {
  watchQuery = jest.fn();
}

const ID_EXAMPLE = '123';
const POST_EXAMPLE = {id: ID_EXAMPLE} as Post;
const POSTS_EXAMPLE = [
  POST_EXAMPLE,
  {id: '12'} as Post
];

describe('PostService', () => {
  let service: PostService;
  let apollo: ApolloStub;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PostService,
      {provide: Apollo, useClass: ApolloStub}
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(PostService);
    apollo = TestBed.get(Apollo);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch list of posts from backend', (done) => {
    jest.spyOn(apollo, 'watchQuery').mockReturnValue({valueChanges: of({data: {posts: POSTS_EXAMPLE}})});

    service.fetchPosts().subscribe((posts) => {
      expect(posts).toEqual(POSTS_EXAMPLE);
      expect(apollo.watchQuery).toHaveBeenCalledWith({query: POSTS_QUERY});
      done();
    });
  });

  it('should fetch a post by id', (done) => {
    jest.spyOn(apollo, 'watchQuery').mockReturnValue({valueChanges: of({data: {post: POST_EXAMPLE}})});

    service.fetchPost(ID_EXAMPLE).subscribe((post) => {
      expect(post).toEqual(POST_EXAMPLE);
      expect(apollo.watchQuery).toHaveBeenCalledWith({query: POST_QUERY, variables: {id: ID_EXAMPLE}});
      done();
    });
  });
});
