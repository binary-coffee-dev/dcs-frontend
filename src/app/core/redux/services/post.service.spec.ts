import {TestBed} from '@angular/core/testing';
import {Apollo} from 'apollo-angular';

import {of} from 'rxjs';

import {PostService} from './post.service';
import {Post, PostConnection} from '../models';
import {POST_QUERY, POSTS_QUERY} from '../../graphql/queries';

class ApolloStub {
  watchQuery = jest.fn();
}

const ID_EXAMPLE = '123';
const POST_EXAMPLE = {id: ID_EXAMPLE} as Post;
const COUNT_EXAMPLE = 123;
const LIMIT_EXAMPLE = 12;
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
    jest.spyOn(apollo, 'watchQuery').mockReturnValue({
      valueChanges: of({
        data: {
          postsConnection: {
            values: POSTS_EXAMPLE,
            aggregate: {count: COUNT_EXAMPLE}
          } as PostConnection
        }
      })
    });

    service.fetchPosts(LIMIT_EXAMPLE).subscribe((posts) => {
      expect(posts).toEqual({values: POSTS_EXAMPLE, aggregate: {count: COUNT_EXAMPLE}} as PostConnection);
      expect(apollo.watchQuery).toHaveBeenCalledWith({query: POSTS_QUERY, variables: {limit: LIMIT_EXAMPLE, start: 0}});
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
