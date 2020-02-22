import {TestBed} from '@angular/core/testing';

import {Apollo} from 'apollo-angular';

import {PostService} from './post.service';

class ApolloStub {
}

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [PostService, {provide: Apollo, useClass: ApolloStub}]
  }));

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });
});
